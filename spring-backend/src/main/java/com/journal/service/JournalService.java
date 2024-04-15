package com.journal.service;

import java.util.List;

import com.journal.entity.Journal;

public interface JournalService {
	
	List<Journal> getAllJournals();
	
	Journal getJournalById(Long id);
	
	Journal saveJournal(Journal Journal);
	
	void deleteJournalById(Long id);
	
	Journal updateJournalById(Long id, Journal newJournal);
	
}
