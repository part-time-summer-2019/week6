from model.account import Account
from model import trade
from .app import app
from flask import jsonify, request
from datetime import datetime

NOT_FOUND = {"error": "not found"}
INSUFFICIENT_FUNDS = {"error": "insufficient funds"}
INSUFFICIENT_SHARES = {"error": "insufficient shares"}
VALUE_ERROR = {"error": "bad value"}
COULD_NOT_AUTHENTICATE = {"error": "could not authenticate"}
BAD_REQUEST = {"error": "bad request"}
NO_SUCH_SYMBOL = {"error": "no such symbol"}
API_NETWORK_ERROR = {"error": "api network error"}


@app.route("/api/price/<symbol>", methods=["GET"])
def price_lookup(symbol):
    try:
        price = trade.get_price(symbol)
    except trade.SymbolNotFound:
        return jsonify(NO_SUCH_SYMBOL), 404
    return jsonify({
        "symbol": symbol.lower(),
        "price": price,
        "time": datetime.now().isoformat()
    })


@app.route("/api/pw_authenticate", methods=["POST"])
def pw_authenticate():
    if not request.json or "username" not in request.json or "password" not in request.json:
        return jsonify(BAD_REQUEST), 400
    account = Account.login(request.json["username"], request.json["password"])
    if not account:
        return jsonify(COULD_NOT_AUTHENTICATE), 401
    return jsonify({
        "username": account["username"],
        "api_key": account["api_key"]
    })


@app.route("/api/<api_key>/user_info", methods=["GET"])
def user_info(api_key):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(COULD_NOT_AUTHENTICATE), 401
    return jsonify(account.json())


@app.route("/api/<api_key>/positions", methods=["GET"])
def positions(api_key):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(COULD_NOT_AUTHENTICATE), 401
    poslist = [pos.json() for pos in account.positions()]
    return jsonify(poslist)


@app.route("/api/<api_key>/position/<symbol>", methods=["GET"])
def position_for(api_key, symbol):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(COULD_NOT_AUTHENTICATE), 401
    pos = account.position_for(symbol)
    try:
        return jsonify({**pos.json(), "current value": pos.current_value()})
    except trade.SymbolNotFound:
        return jsonify(NO_SUCH_SYMBOL), 404
    except trade.APINetworkError:
        return jsonify(API_NETWORK_ERROR), 500


@app.route("/api/<api_key>/trades", methods=["GET"])
def trades(api_key):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(COULD_NOT_AUTHENTICATE), 401
    tradelist = [trade.json() for trade in account.trades()]
    return jsonify(tradelist)


@app.route("/api/<api_key>/trades/<symbol>", methods=["GET"])
def trades_for(api_key, symbol):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(COULD_NOT_AUTHENTICATE), 401
    tradelist = [trade.json() for trade in account.trades_for(symbol)]
    return jsonify(tradelist)


@app.route("/api/<api_key>/buy", methods=["POST"])
def buy(api_key):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(COULD_NOT_AUTHENTICATE), 401
    if not request.json or "symbol" not in request.json or "volume" not in request.json:
        return jsonify(BAD_REQUEST), 400
    if not isinstance(request.json["volume"], int):
        return jsonify(BAD_REQUEST)
    try:
        account.buy(request.json["symbol"], request.json["volume"])
    except trade.InsufficientFundsError:
        return jsonify(INSUFFICIENT_FUNDS), 400
    except trade.SymbolNotFound:
        return jsonify(NO_SUCH_SYMBOL), 400

    pos = account.position_for(request.json["symbol"])
    trd = account.trades_for(request.json["symbol"])[-1]
    return jsonify({
        "buy": {
            "user": account.json(),
            "trade": trd.json(),
            "position": pos.json()
        }
    })


@app.route("/api/<api_key>/sell", methods=["POST"])
def sell(api_key):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(COULD_NOT_AUTHENTICATE), 401
    if not request.json or "symbol" not in request.json or "volume" not in request.json:
        return jsonify(BAD_REQUEST), 400
    if not isinstance(request.json["volume"], int):
        return jsonify(BAD_REQUEST)
    try:
        account.sell(request.json["symbol"], request.json["volume"])
    except trade.InsufficientSharesError:
        return jsonify(INSUFFICIENT_SHARES), 400
    except trade.SymbolNotFound:
        return jsonify(NO_SUCH_SYMBOL), 400

    pos = account.position_for(request.json["symbol"])
    trd = account.trades_for(request.json["symbol"])[-1]
    return jsonify({
        "buy": {
            "user": account.json(),
            "trade": trd.json(),
            "position": pos.json()
        }
    })
