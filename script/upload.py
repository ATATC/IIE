import os


def gen_cmd(sub: str, dst_ip: str) -> str:
    return f"scp -r {os.getcwd()}/{sub} root@{dst_ip}/var/www/html/"


if __name__ == '__main__':
    print(gen_cmd("en", "192.168.56.101"))
