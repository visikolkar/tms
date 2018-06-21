interface EmployeeInfo {
    emp_id: string;
    emp_name: string;
    emp_email: string;
}

interface SkillInfo {
    emp_id: string;
    primary_skill_one: string;
    secondary_skill_one: string;
}

export class Employee {
    emp_info: EmployeeInfo;
    skill: SkillInfo;
}
