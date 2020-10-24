import random
import hashlib

from utils import generate_identicon


def generate_unique_identicon(name):
    # hashlib takes the argument in byte, hence converting the string input to bytes
    byte_value = hashlib.md5(name.encode())

    # The generated byte input is converted to hexa format using hexdigest()
    hash_in_hexa = byte_value.hexdigest()

    return generate_identicon(hash_in_hexa)


# Generating random identicon


def generate_random_identicon():
    randomint = str(random.randint(0, pow(10, 40)))
    # hashlib takes the argument in byte, hence converting the string input to bytes
    byte_value = hashlib.md5(randomint.encode())

    # The generated byte input is converted to hexa format using hexdigest()
    random_hash = byte_value.hexdigest()

    return generate_identicon(random_hash)
