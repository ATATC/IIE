import os
import zipfile


def _pack(d: str, h):
    for f in os.listdir(d):
        pth = f"{d}/{f}"
        if os.path.isdir(pth):
            _pack(pth, h)
        else:
            h.write(pth)


def pack(fn: str, dst: str):
    with zipfile.ZipFile(dst, "w") as h:
        _pack(fn, h)


if __name__ == '__main__':
    pack("..", "C:\\Users\\futer\\Desktop\\IIE.zip")
