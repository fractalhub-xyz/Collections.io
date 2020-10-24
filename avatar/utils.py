import io
from avatar import logic
import base64
from PIL import Image, ImageDraw

BACKGROUND_COLOR = (255, 255, 255)


def generate_identicon(hash_in_hexa):
    color = generate_color(hash_in_hexa)
    half_matrix = generate_matrix(hash_in_hexa)
    matrix = mirror_matrix(half_matrix)
    flatten_list = flat_matrix(matrix)
    pixels = pixel_generation(flatten_list)
    identicon = draw_identicon(color, flatten_list, pixels)

    byte_array = io.BytesIO()
    identicon.save(byte_array, format='PNG')
    img_base64 = base64.b64encode(byte_array.getvalue()).decode('ascii')
    url = "data:image/png;base64,"+img_base64

    return url


def flat_matrix(matrix):
    flatten_list = [item for row in matrix for item in row]
    return flatten_list


def pixel_generation(matrix):
    pixels = []
    for i, val in enumerate(matrix):
        x = int(i % 5 * 50)+20
        y = int(i//5 * 50)+20

        left_top = (x, y)
        right_bottom = (x+50, y+50)
        pixels.append([left_top, right_bottom])

    return pixels


def generate_color(hash):
    r, g, b = tuple(hash[i:i+2] for i in range(0, 6, 2))
    return f'#{r}{g}{b}'


def draw_identicon(color, flatten_list, pixels):
    identicon = Image.new('RGB', (50*5+20*2, 50*5+20*2), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(identicon)
    for grid, pixels in zip(flatten_list, pixels):
        if grid != 0:
            draw.rectangle(pixels, fill=color)

    return identicon


def generate_matrix(hash):
    half_matrix = [[hash[col:col+2]
                    for col in range(row, row+6, 2)]for row in range(0, 30, 6)]

    return half_matrix


def mirror_matrix(half_matrix):
    new_matrix = []
    for items in half_matrix:
        mirror_items = list(reversed(items))
        new_matrix.append(items+mirror_items[1:])

    # CHANGE THE LOGIC HERE, CURRENT METHOD IS ODD-EVEN BASED

    new_matrix = logic.m4(new_matrix)
    return new_matrix
