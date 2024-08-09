import os
import sqlite3

# Table names
user = 'USER'
seller = 'SELLER'
product = 'PRODUCT'
reviews = 'REVIEWS'

# SQlite connection
con = sqlite3.connect(os.path.join(
    'backend', 'base', 'data.db'), check_same_thread=False)
cur = con.cursor()


def main():
    # Creating tables if they don't exist
    cur.execute(f'''CREATE TABLE IF NOT EXISTS {seller} (
                id INTEGER PRIMARY KEY,
                name TEXT,
                cuisine TEXT,
                fssai INTEGER,
                email TEXT,
                phone INTEGER,
                password TEXT
                )'''
                )
    cur.execute(f'''CREATE TABLE IF NOT EXISTS {user} (
                id INTEGER PRIMARY KEY,
                name TEXT,
                description TEXT,
                email TEXT,
                phone INTEGER,
                password TEXT
                )'''
                )
    cur.execute(f'''CREATE TABLE IF NOT EXISTS {reviews} (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                title TEXT,
                description TEXT,
                rating INTERGER,
                time TEXT
                )'''
                )
    cur.execute(f'''CREATE TABLE IF NOT EXISTS {product} (
                id INTEGER PRIMARY KEY,
                seller_id INTEGER NOT NULL,
                name TEXT,
                description TEXT,
                product_image BLOB
                )'''
                )
    con.commit()
    return con, cur


if __name__ == '__main__':
    main()
