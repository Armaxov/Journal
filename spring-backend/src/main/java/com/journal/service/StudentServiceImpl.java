package com.journal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.journal.entity.Student;
import com.journal.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService{

	private final StudentRepository studentRepository;
	
	@Autowired
	public StudentServiceImpl(StudentRepository studentRepository) {
		this.studentRepository = studentRepository;
	}
	
	@Override
	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

	@Override
	public Student getStudentById(Long id) {
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new ResourceAccessException("Student is not exist with id:" + id));
		return student;
	}

	@Override
	public Student saveStudent(Student student) {
		return studentRepository.save(student);
	}

	@Override
	public void deleteStudentById(Long id) {
		Student student = getStudentById(id);
		studentRepository.delete(student);
	}

	@Override
	public Student updateStudentById(Long id, Student newStudent) {
		Student student = getStudentById(id);
		student.changeStudentData(newStudent);
		return studentRepository.save(student);
	}

	@Override
	public List<Student> getStudentsByGroupId(Long groupId) {
		List<Student> students = getAllStudents();
		List<Student> sortedStudents = new ArrayList<>();

		for(Student student: students){
			if(student.getGroupId() == groupId)
				sortedStudents.add(student);
		}
		return sortedStudents;
	}


}
