import os
import shutil


EXEMPTION_SUFFIX = [".html", "jquery-3.6.1.min.js"]


def cp(frm: str, t: str, mkdir: bool = False):
    if not os.path.exists(t) and mkdir:
        os.mkdir(t)
    for fn in os.listdir(frm):
        pth = f"{frm}/{fn}", f"{t}/{fn}"
        if os.path.isdir(pth[0]):
            cp(*pth, mkdir=mkdir)
        for sfx in EXEMPTION_SUFFIX:
            if fn.endswith(sfx):
                shutil.copyfile(*pth)


if __name__ == '__main__':
    print(os.listdir("../en-src"))
    cp("../en-src", "../en", True)
