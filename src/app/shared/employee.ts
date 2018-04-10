interface EmployeeInfo {
    empId: string;
    empName: string;
    empEmail: string;
}

interface SkillInfo{
    empId: string;
    primarySkillLevelOne: string;
    secondarySkillLevelOne: string;
}

export class Employee {
    empInfo: EmployeeInfo;
    skill: SkillInfo;
}
