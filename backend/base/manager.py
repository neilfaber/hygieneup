from base import setup

con, cur = setup.main()


class Base:  # Includes basic utility functions
    def __init__(self) -> None:
        self.cursor = con.cursor()

    def merge_map(self, keys: list, values: list) -> dict:
        return dict(zip(keys, values))

    def drop_pass(self, data) -> list:
        return data[0:-1:]

    def get_keys(self):
        return [key[0] for key in self.cursor.description]


class User(Base):  # User table handler
    id = 'id'
    name = 'name'
    description = 'description'
    email = 'email'
    phone = 'phone'

    def __init__(self) -> None:
        super().__init__()
        self.table = setup.user

    # Inserts only if phone or email doesn't exist in table
    def insert(self, name: str, description: str, email: str, phone: int, password: str):
        if (self.validate_not_exist(email=email, phone=phone)):
            self.cursor.execute(f'''INSERT INTO {self.table} (name, description, email, phone, password) VALUES (?,?,?,?,?)''', (
                name, description, email, phone, password))
            con.commit()
            return True
        else:
            return False

    def login(self, email: str = '', phone: int = 0, password: str = ''):
        column, credential = None, None
        if email:
            column, credential = 'email', email
        else:
            column, credential = 'phone', phone
        data = self.cursor.execute(f'''SELECT * FROM {self.table}
                    WHERE {column} = ? AND password = ?''', (credential, password)).fetchall()
        keys = self.get_keys()
        return self.merge_map(self.drop_pass(data), self.drop_pass(keys))

    def get(self, column_name='id', credential=''):
        data = self.cursor.execute(f'''SELECT * FROM {self.table}
                    WHERE {column_name} = ? ''', (credential,)).fetchall()[0]
        keys = self.get_keys()
        return self.merge_map(self.drop_pass(keys), self.drop_pass(data))

    # Checks if phone and email are not in table
    def validate_not_exist(self, email='', phone=0) -> bool:
        if (self.cursor.execute(f'''SELECT * FROM {self.table}
                    WHERE email = ? OR phone = ?''', (email, phone)).fetchall()):
            return False
        return True


class Seller(Base):  # Seller table handler
    id = 'id'
    name = 'name'
    cuisine = 'cuisine'
    fssai = 'fssai'
    email = 'email'
    phone = 'phone'
    password = 'password'

    def __init__(self) -> None:
        super().__init__()
        self.table = setup.seller

    # Creates seller if email and phone doesn't exist
    def insert(self, name: str, cuisine: str, fssai: str, email: str, phone: int, password: str):
        if (self.validate_not_exist(email=email, phone=phone)):
            self.cursor.execute(f'''INSERT INTO {self.table} (name, cuisine, fssai, email, phone, password) VALUES (?,?,?,?,?,?)''', (
                name, cuisine, fssai, email, phone, password))
            con.commit()
            return True
        else:
            return False

    def login(self, email: str = '', phone: int = 0, password: str = ''):
        column, credential = None, None
        if email:
            column, credential = 'email', email
        else:
            column, credential = 'phone', phone
        data = self.cursor.execute(f'''SELECT * FROM {self.table}
                    WHERE {column} = ? AND password = ?''', (credential, password)).fetchall()[0]
        keys = self.get_keys()
        return self.merge_map(self.drop_pass(keys), self.drop_pass(data))

    def get(self, column_name='id', credential=''):
        data = self.cursor.execute(f'''SELECT * FROM {self.table}
                    WHERE {column_name} = ? ''', (credential,)).fetchall()[0]
        keys = self.get_keys()
        data = self.merge_map(self.drop_pass(keys), self.drop_pass(data))
        return data

    # Check if phone and email exist
    def validate_not_exist(self, email='', phone=0) -> bool:
        if (self.cursor.execute(f'''SELECT * FROM {self.table}
                    WHERE email = ? OR phone = ?''', (email, phone)).fetchall()):
            return False
        return True


class Reviews(Base):
    id = 'id'
    user_id = 'user_id'
    product_id = 'product_id'
    title = 'title'
    cuisine = 'cuisine'
    rating = 'rating'
    time = 'time'

    def __init__(self) -> None:
        self.table = setup.reviews

    def insert(self, user_id: int, product_id: int, title: str, description: str, rating: int, time: str):
        if (self.validate_not_exist(user_id, product_id)):
            self.cursor.execute(f'''INSERT INTO {self.table} ( user_id, product_id, title, description, rating, time) VALUES (?,?,?,?,?,?)''', (
                user_id, product_id, title, description, rating, time))
            con.commit()
            return True
        else:
            return False

    def get(self, id=0, user_id=0, product_id=0) -> list:
        data = self.cursor.execute(
            f'''SELECT * FROM {self.table} WHERE id = ? OR user_id = ? OR product_id = ?''', (id, user_id, product_id)).fetchall()
        keys = self.get_keys()
        data = [self.merge_map(keys, values) for values in data]
        return data

    def validate_not_exist(self, user_id, product_id):
        if (self.cursor.execute(f'''SELECT * FROM {self.table} WHERE user_id = ? AND product_id = ?)''', (user_id, product_id)).fetchall()):
            return False
        else:
            return True


class Products(Base):
    id = 'id'
    seller_id = 'seller_id'
    name = 'name'
    description = 'description'
    product_image = 'product_image'

    def __init__(self) -> None:
        super().__init__()
        self.table = setup.product

    def insert(self, seller_id: int, name: str, description: str, product_image: bytes):
        self.cursor.execute(f'''INSERT INTO
                            {self.table} ( seller_id, name ,description, product_image) VALUES (?,?,?,?)''', (seller_id, name, description, product_image))
        con.commit()
        return True

    def get(self, id=0, seller_id=0, name=''):
        data = self.cursor.execute(
            f'''SELECT * FROM {self.table} WHERE id = ? OR seller_id = ? OR name = ? ''', (id, seller_id, name)).fetchall()
        keys = self.get_keys()
        data = [self.merge_map(self.drop_pass(
            keys), self.drop_pass(value)) for value in data]
        if (id):
            return data[0]
        else:
            return data

    def get_all(self):
        data = self.cursor.execute(
            f'''SELECT * FROM {self.table} ''').fetchall()
        keys = self.get_keys()
        data = [self.merge_map(keys, values) for values in data]
        return data


def insert_seller():    # Function to create database values not to be used for production
    seller = Seller()
    data = [
        ['Alice Smith', 'Healthy', 123456789,
            'alice@example.com', 9876543210, 'securepassword1'],
        ['Bob Johnson', 'Restaurant owner', 987654321,
            'bob@example.com', 8765432109, 'securepassword2'],
        ['Charlie Brown', 'Food supplier', 456123789,
            'charlie@example.com', 7654321098, 'securepassword3'],
        ['Diana Ross', 'Catering service', 789456123,
            'diana@example.com', 6543210987, 'securepassword4'],
        ['Eve Davis', 'Dietitian', 321654987,
            'eve@example.com', 5432109876, 'securepassword5']
    ]
    for person in data:
        seller.insert(person[0], person[1], person[2],
                      person[3], person[4], person[5])


def insert_user():  # Function to create database values not to be used for production
    user = User()
    data = [
        ['John Doe', 'Customer', 'john@example.com', 1234567890, 'userpassword1'],
        ['Jane Smith', 'Blog Writer', 'jane@example.com',
            2345678901, 'userpassword2'],
        ['Sam Wilson', 'Subscriber', 'sam@example.com', 3456789012, 'userpassword3'],
        ['Lucy Liu', 'Forum Moderator', 'lucy@example.com',
            4567890123, 'userpassword4'],
        ['Mike Johnson', 'Community Member',
            'mike@example.com', 5678901234, 'userpassword5']
    ]

    for person in data:
        user.insert(person[0], person[1], person[2], person[3], person[4])


def insert_product():  # Function to create database values not to be used for production
    import os

    product = Products()
    path = os.path.join('backend', 'base', 'images')

    products_data = [
        # Seller 1: Alice Smith
        [1, 'Organic Honey',
            'Pure and natural honey from wildflowers (Healthy)', b'image_bytes_1'],
        [1, 'Herbal Tea',
            'A blend of organic herbs for a refreshing tea (Healthy)', b'image_bytes_2'],
        [1, 'Nut Mix',
            'A mix of organic nuts and dried fruits (Healthy)', b'image_bytes_3'],

        # Seller 2: Bob Johnson
        [2, 'Gourmet Pizza',
            'Wood-fired pizza with fresh ingredients (Fast Food)', b'image_bytes_4'],
        [2, 'Artisan Bread',
            'Freshly baked bread with organic flour (Bakery)', b'image_bytes_5'],
        [2, 'Spaghetti Bolognese',
            'Traditional Italian pasta with meat sauce (Fast Food)', b'image_bytes_6'],

        # Seller 3: Charlie Brown
        [3, 'Farm Fresh Eggs',
            'Organic eggs from free-range chickens (Healthy)', b'image_bytes_7'],
        [3, 'Vegetable Box',
            'A box of seasonal organic vegetables (Healthy)', b'image_bytes_8'],
        [3, 'Fresh Juice',
            'Cold-pressed juice made from organic fruits (Healthy)', b'image_bytes_9'],

        # Seller 4: Diana Ross
        [4, 'Catering Package',
            'Full-service catering for events (Service)', b'image_bytes_10'],
        [4, 'Gourmet Desserts',
            'Assorted gourmet desserts for special occasions (Bakery)', b'image_bytes_11'],
        [4, 'Healthy Salads',
            'Assorted salads with organic ingredients (Healthy)', b'image_bytes_12'],

        # Seller 5: Eve Davis
        [5, 'Diet Plan',
            'Personalized diet plan for healthy living (Service)', b'image_bytes_13'],
        [5, 'Nutrition Counseling',
            'One-on-one nutrition counseling sessions (Service)', b'image_bytes_14'],
        [5, 'Protein Bars',
            'Homemade protein bars for a healthy snack (Healthy)', b'image_bytes_15']
    ]
    for i in range(len(products_data)):
        image = ''
        with open(os.path.join(path, f'{i}.jpg'), 'rb') as file:
            image = file.read()
        product.insert(
            products_data[i][0], products_data[i][1], products_data[i][2], image)


if __name__ == '__main__':
    insert_seller()
    insert_user()
    insert_product()
