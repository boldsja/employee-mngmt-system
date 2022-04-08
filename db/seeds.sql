use employees;

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Lawyer", 200000, 4),
    ("Senior Software Engineer", 200000, 2);

INSERT INTO employee    
    (first_name, last_name, role_id)
VALUES
    ("Jasmine", "Bolds", 3),
    ("George", "Lucas", 2),
    ("Jim", "Carey", 1);




