namespace Commons
{
    public static class StringExtensions
    {
        public static string Sanitize(this string s) =>
            s.Trim().ToLower();
    }
}
