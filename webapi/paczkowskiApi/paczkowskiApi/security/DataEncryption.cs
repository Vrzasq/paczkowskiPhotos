using System;
using System.Text;
using Commons;
using Newtonsoft.Json;
using System.Security.Cryptography;
using DbContract.Entities;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace paczkowskiApi.security
{
    public class AesEncryption
    {
        private static AesEncryption _instance;

        private AesEncryption() { }

        public static AesEncryption Instance
        {
            get
            {
                if (_instance == null)
                {
                    var configurationBuilder = new ConfigurationBuilder();
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
                    configurationBuilder.AddJsonFile(path, false);
                    var root = configurationBuilder.Build();

                    _instance = root.GetSection("AesEncryption").Get<AesEncryption>();
                }

                return _instance;
            }
        }

        public string Key { get; set; }
        public string IV { get; set; }
    }

    public static class DataEncryption
    {
        public static string Encrypt<T>(T blob)
        {
            string json = blob.ToJson();
            string base64 = ConverToBase64(json);
            string encrypetd = GetAesEcnryptedString(base64);

            return encrypetd;
        }

        public static T Decrypt<T>(string encryptedBlob) where T : new()
        {
            T blob = new T();

            if (encryptedBlob != null)
            {
                string decryptedBlob = GetAesDecryptedString(encryptedBlob);
                byte[] bytes = Convert.FromBase64String(decryptedBlob);
                string json = ConvertFromBase64(bytes);
                blob = JsonConvert.DeserializeObject<T>(json);
            }

            return blob;
        }

        private static string GetAesEcnryptedString(string base64)
        {
            using (var aes = Aes.Create())
            {
                var aesConfig = AesEncryption.Instance;

                aes.Key = Encoding.ASCII.GetBytes(aesConfig.Key);
                aes.IV = Encoding.ASCII.GetBytes(aesConfig.IV);

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (var memoryStream = new MemoryStream())
                using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                using (var streamWriter = new StreamWriter(cryptoStream))
                {
                    streamWriter.Write(base64);
                    var bytes = memoryStream.ToArray();
                    return Encoding.ASCII.GetString(bytes);
                }
            }
        }

        private static string GetAesDecryptedString(string encryptedBlob)
        {
            using (var aes = Aes.Create())
            {
                var aesConfig = AesEncryption.Instance;

                aes.Key = Encoding.ASCII.GetBytes(aesConfig.Key);
                aes.IV = Encoding.ASCII.GetBytes(aesConfig.IV);

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (var memoryStream = new MemoryStream())
                using (var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                using (var streamReader = new StreamReader(cryptoStream))
                {
                    var decryptedBlob = streamReader.ReadToEnd();
                    return decryptedBlob;
                }
            }
        }

        private static string ConverToBase64(string s) =>
            Convert.ToBase64String(Encoding.ASCII.GetBytes(s));

        private static string ConvertFromBase64(byte[] bytes) =>
            Encoding.ASCII.GetString(bytes);
    }
}
