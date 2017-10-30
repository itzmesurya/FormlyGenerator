using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace FormlyGenerator
{
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
        }

        private void AddIdBtn_Click(object sender, EventArgs e)
        {
            var t = mainRtb.Text;
            JsonConvert.DeserializeObject<FormlyField>(t);
            
        }

        private void Main_Load(object sender, EventArgs e)
        {

        }
    }
}
