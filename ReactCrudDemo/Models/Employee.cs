using System;
using System.Collections.Generic;

namespace ReactCrudDemo.Models
{
    public partial class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string Designation { get; set; }
        public string EmployeeType { get; set; }
        public string ReportingManager { get; set; }
        public string DepartmentName { get; set; }
        public string LastName { get; set; }
        public string Notes { get; set; }
    }
}
