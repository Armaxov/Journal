package com.journal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.journal.entity.Student;
import com.journal.service.StudentService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class StudentController {
	
	private StudentService studentService;

	@Autowired
	public StudentController(StudentService studentService) {
		this.studentService = studentService;
	}
	
	@GetMapping("/students")
	public List<Student> getAllStudents(){
		return studentService.getAllStudents();
	}
	
	@GetMapping("/students/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
		Student student = studentService.getStudentById(id);
		return ResponseEntity.ok(student);
	}

	@GetMapping("/students/group/{groupId}")
	public List<Student> getStudentsByGroup(@PathVariable Long groupId){
		List<Student> students = studentService.getStudentsByGroupId(groupId);
		return  students;
	}
	
	@PostMapping("/students")
	public Student createStudent(@RequestBody Student student) {
		Student savedStudent = studentService.saveStudent(student);
		System.out.println(savedStudent.getId());
		return savedStudent;
	}
	
	@PutMapping("/students/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student newStudent){
		return ResponseEntity.ok(studentService.updateStudentById(id, newStudent));
	}
	
	@DeleteMapping("/students/{id}")
	public ResponseEntity<Student> deleteStudent(@PathVariable Long id){
		studentService.deleteStudentById(id);
		
		return ResponseEntity.noContent().build();
	}
	
	
	
}
