package com.journal.service;

import java.util.List;

import com.journal.entity.Student;

public interface StudentService {

	List<Student> getAllStudents();
	
	Student getStudentById(Long id);
	
	Student saveStudent(Student student);
	
	void deleteStudentById(Long id);
	
	Student updateStudentById(Long id, Student newStudent);

	List<Student> getStudentsByGroupId(Long groupId);
}
