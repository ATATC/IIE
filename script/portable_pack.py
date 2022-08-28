import os
import zipfile


def pack(fn: str, dst: str):
    with zipfile.ZipFile(dst, "w") as f:
        for file in os.listdir(fn):
            f.write(f"{fn}/{file}")


if __name__ == '__main__':
    pack("..", "C:\\Users\\futer\\Desktop\\IIE.zip")
