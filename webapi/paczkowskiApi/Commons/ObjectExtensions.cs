﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace Commons
{
    public static class ObjectExtensions
    {
        public static string ToJson<TValue>(this TValue source) =>
            JsonConvert.SerializeObject(source, Formatting.None);
    }
}
