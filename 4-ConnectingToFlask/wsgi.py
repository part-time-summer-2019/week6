from model import sqlite3orm
from model_setup import DBPATH
import os

sqlite3orm.set_database_path(DBPATH)

from flask_app.app import app
