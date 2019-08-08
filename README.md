# macOS-encrypt-decrypt

This `macOS` `Quick Action` removes all the complication when encrypting and decrypting files. Simply right click on a file you'd like to encrypt or decrypt, select the `Encrypt Decrypt` `Quick Action`, and follow the prompts.

<h1 align="center">
  <img src="img/demo.gif" width="80%" />
  <br />
</h1>

## Installation

```bash
$ git clone https://github.com/alichtman/macOS-encrypt-decrypt.git
$ cd macOS-encrypt-decrypt
$ ./install.sh
```

You will see a prompt like this. Click `Install`:

<h1 align="center">
  <img src="img/do-you-want-to-install-prompt.png" width="70%" />
  <br />
</h1>

The first time you use the `Quick Action`, you may be prompted to allow it to interact with files on your computer through Finder. This is a necessary permission for it to run.

<h1 align="center">
  <img src="img/ServicesUIAgent-permissions-prompt.png" width="70%" />
  <br />
</h1>

If you'd like to add a keyboard shortcut, go to `Preferences > Keyboard > Shortcuts > Services`.

<h1 align="center">
  <img src="img/keyboard-shortcut.png" width="70%" />
  <br />
</h1>

Since you have installed the `Encrypt\ Decrypt.app`, you can set it as the default for opening `.encrypted` files. This means you'll be able to double-click on files ending in `.encrypted` and be prompted for a decryption key. You can set this up the first time you double-click on a `.encrypted` file, or by right-clicking on a `.encrypted` file, selecting `Get Info` and changing the default app in the `Open With:` section.

## Usage Notes

- This script can encrypt any file or directory. It uses `AES-256` in `CTR` mode. It can also decrypt any file that was encrypted using `AES-256-CTR` mode.

- After files are encrypted, they will have an extension like `.aef99d86babcf82102fa.encrypted`. This extension holds a `SHA1` hash of the decrypted file which is used to verify that decryption key you supply is correct. If you alter this extension, decryption will fail because the file hashes won't match. You'll still be able to decrypt your file on the command line with `$ openssl enc -d -aes-256-ctr -in encrypted_file -out encrypted_file.orig`, though.

- Filepaths with spaces in them will fail to encrypt. This issue is being tracked [(#7)](https://github.com/alichtman/macOS-encrypt-decrypt/issues/7), but until it's fixed, just, ya know, don't?

## Technical Details

This script uses `openssl`'s implementation of the [`AES 256`](https://csrc.nist.gov/csrc/media/publications/fips/197/final/documents/fips-197.pdf) encryption algorithm in [Counter](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Counter_(CTR)) (`CTR`) mode, like is recommended in Professor Rogaway's [_Evaluation of Some Blockcipher Modes of Operation_](https://web.cs.ucdavis.edu/~rogaway/papers/modes.pdf). This algorithm is part of the NSA's [Commercial National Security Algorithm Suite](https://apps.nsa.gov/iaarchive/programs/iad-initiatives/cnsa-suite.cfm) and is approved to protect up to TOP SECRET documents.

This script uses the `-salt` `openssl` option. This makes [Rainbow Table attacks](https://en.wikipedia.org/wiki/Rainbow_table) impractical, however, it also means that if you encrypt a file and forget the password -- that's game. Nobody can recover that file. Back up your passphrases!
