using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FormlyGenerator
{
    class FormlyField
    {
        public string id
        {
            get
            {
                return "id_" + this.key;
            }
        }
        public string template { get; set; }
        public string className { get; set; }
        public string key { get; set; }
        public string type { get; set; }
        public TemplateOptions templateOptions { get; set; }
        public Validation validation { get; set; }
    }
}
