namespace FormlyGenerator
{
    partial class Main
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.mainRtb = new System.Windows.Forms.RichTextBox();
            this.AddIdBtn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // mainRtb
            // 
            this.mainRtb.Location = new System.Drawing.Point(21, 25);
            this.mainRtb.Name = "mainRtb";
            this.mainRtb.Size = new System.Drawing.Size(792, 633);
            this.mainRtb.TabIndex = 0;
            this.mainRtb.Text = "";
            // 
            // AddIdBtn
            // 
            this.AddIdBtn.Location = new System.Drawing.Point(684, 683);
            this.AddIdBtn.Name = "AddIdBtn";
            this.AddIdBtn.Size = new System.Drawing.Size(75, 23);
            this.AddIdBtn.TabIndex = 1;
            this.AddIdBtn.Text = "Add Id";
            this.AddIdBtn.UseVisualStyleBackColor = true;
            this.AddIdBtn.Click += new System.EventHandler(this.AddIdBtn_Click);
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(848, 733);
            this.Controls.Add(this.AddIdBtn);
            this.Controls.Add(this.mainRtb);
            this.Name = "Main";
            this.Text = "Main";
            this.Load += new System.EventHandler(this.Main_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.RichTextBox mainRtb;
        private System.Windows.Forms.Button AddIdBtn;
    }
}

