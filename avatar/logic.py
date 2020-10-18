def m1(matrix):
    # Comparing adjacent values in the matrix

    pattern_matrix = []
    for letter in matrix:
        row = []
        for position, value in enumerate(letter):
            if position < 4 and int(letter[position+1], base=16) > int(value, base=16):
                row.append(0)
            else:
                row.append(1)
        pattern_matrix.append(row)

    return pattern_matrix


def m2(matrix):
    # It generates patterns similar to face

    pattern_array = []
    total = 0

    for row in matrix:
        for letter in row:
            ascii_value = int(letter, base=16)
            total += ascii_value

    avg = total/25

    for row in matrix:
        updated_row = []
        for item in row:
            if int(item, base=16) > avg:
                updated_row.append(0)
            else:
                updated_row.append(1)
        pattern_array.append(updated_row)

    return pattern_array


def m3(matrix):  # Not suitable
    pattern_array = []
    count = {}
    median = 0

    for rows in matrix:
        for letter in rows:
            count[letter] = count.get(letter, 0)+1
            if count[letter] > median:
                median = int(letter, base=16)

    for row in matrix:
        updated_row = []
        for letter in row:
            if int(letter, base=16) < median:
                updated_row.append(0)
            else:
                updated_row.append(1)
        pattern_array.append(updated_row)
    return pattern_array


def m4(matrix):
    # Based on ODD-EVEN matrix value

    pattern_matrix = [[int(item, base=16) if int(item, base=16) %
                       2 == 0 else 0 for item in row]for row in matrix]
    return pattern_matrix
