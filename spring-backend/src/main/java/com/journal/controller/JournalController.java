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

import com.journal.entity.Journal;
import com.journal.service.JournalService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class JournalController {

	
	private final JournalService journalService; 
	
	@Autowired
	public JournalController(JournalService journalService) {
		this.journalService = journalService;
	}
	
	@GetMapping("/journals")
	public List<Journal> getAllJournals(){return journalService.getAllJournals();
	}
	
	@GetMapping("/journals/{id}")
	public ResponseEntity<Journal> getJournalById(@PathVariable Long id) {
		Journal journal = journalService.getJournalById(id);
		return ResponseEntity.ok(journal);
	}
	
	
	@PostMapping("/journals")
	public Journal createJournal(@RequestBody Journal journal) {
		return journalService.saveJournal(journal);
	}
	
	@PutMapping("/journals/{id}")
	public ResponseEntity<Journal> updateJournal(@PathVariable Long id, @RequestBody Journal newJournal){
		return ResponseEntity.ok(journalService.updateJournalById(id, newJournal));
	}
	
	@DeleteMapping("/journals/{id}")
	public ResponseEntity<Journal> deleteJournal(@PathVariable Long id){
		journalService.deleteJournalById(id);
		return ResponseEntity.noContent().build();
	}
	
}
