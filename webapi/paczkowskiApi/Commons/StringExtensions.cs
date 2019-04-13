using System;
using System.Collections.Generic;
using System.Text;

namespace Commons
{
    public static class StringExtensions
    {
        public static string Sanitize(this string s) =>
            s.Trim().ToLower();
    }
}
