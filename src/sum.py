def calculate_sum(a, b):
    return a + b

if __name__ == "__main__":
    import sys
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    result = calculate_sum(a, b)
    print(result)