using System;
using System.Text;
using Commons;
using Newtonsoft.Json;
using System.Security.Cryptography;

namespace paczkowskiApi.security
{
    public static class TokenEncryption
    {
        public static string Encrypt(AuthTokenBlob tokenBlob)
        {
            string json = tokenBlob.ToJson();
            string base64 = ConverToBase64(json);
            return base64;
        }

        public static AuthTokenBlob Decrypt(string encryptedBlob)
        {
            byte[] bytes = Convert.FromBase64String(encryptedBlob);
            string json = ConvertFromBase64(bytes);
            AuthTokenBlob tokenBlob = JsonConvert.DeserializeObject<AuthTokenBlob>(json);

            return tokenBlob;
        }

        private static string ConverToBase64(string s) =>
            Convert.ToBase64String(Encoding.ASCII.GetBytes(s));

        private static string ConvertFromBase64(byte[] bytes) =>
            Encoding.ASCII.GetString(bytes);
    }
}
