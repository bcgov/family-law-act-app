import base64
import os
import unittest

from .encryption import DecryptError, Encryptor

KEY_VAR = "TEST_KEY"
TEST_KEY = "01234567890123456789012345678901"
TEST_KEY_ID = "hrvKHIiZ2k4"
TEST_CIPHER = (
    b"000000000000000000000000\xb8\x8f4L\xd9\x9cy\xa3p\xc6Ux*\xe2"
    b"\xd3\r\xd5\x1c\x82\xb2\x93C%\xca\x988"
)
TEST_NONCE = b"0" * 24
TEST_VALUE = b"test input"


class TestEncryptor(unittest.TestCase):
    def test_no_data_key(self):
        os.environ[KEY_VAR] = TEST_KEY
        self.assertEqual(Encryptor(KEY_VAR).decrypt(None, TEST_VALUE), TEST_VALUE)

    def test_no_env_key(self):
        if KEY_VAR in os.environ:
            del os.environ[KEY_VAR]
        with self.assertRaises(DecryptError):
            Encryptor(KEY_VAR).decrypt(b"key_id", TEST_VALUE)

    def test_invalid_env_key(self):
        os.environ[KEY_VAR] = "bad key"
        with self.assertRaises(Exception):
            Encryptor(KEY_VAR)

    def test_base64_key(self):
        os.environ[KEY_VAR] = base64.b64encode(TEST_KEY.encode("ascii")).decode("ascii")
        self.assertEqual(Encryptor(KEY_VAR).key_id, TEST_KEY_ID)

    def test_encrypt_decrypt_expected(self):
        os.environ[KEY_VAR] = TEST_KEY
        enc = Encryptor(KEY_VAR)
        (key_id, cipher) = enc.encrypt(TEST_VALUE, TEST_NONCE)
        self.assertEqual(key_id, TEST_KEY_ID)
        self.assertEqual(cipher, TEST_CIPHER)
        self.assertEqual(enc.decrypt(key_id, cipher), TEST_VALUE)

    def test_encrypt_decrypt_random_nonce(self):
        os.environ[KEY_VAR] = TEST_KEY
        enc = Encryptor(KEY_VAR)
        (key_id, cipher) = enc.encrypt(TEST_VALUE)
        self.assertNotEqual(cipher, TEST_CIPHER)
        self.assertEqual(enc.decrypt(TEST_KEY_ID, cipher), TEST_VALUE)


if __name__ == "__main__":
    unittest.main()
