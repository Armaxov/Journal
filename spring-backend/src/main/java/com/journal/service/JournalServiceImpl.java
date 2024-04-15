package com.journal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.journal.entity.Journal;
import com.journal.repository.JournalRepository;

@Service
public class JournalServiceImpl implements JournalService{

	
	private final JournalRepository journalRepository;
	
	@Autowired
	public JournalServiceImpl(JournalRepository journalRepository) {
		this.journalRepository = journalRepository;
	}
	
	@Override
	public List<Journal> getAllJournals() {
		return journalRepository.findAll();
	}

	@Override
	public Journal getJournalById(Long id) {
		Journal Journal = journalRepository.findById(id)
				.orElseThrow(() -> new ResourceAccessException("Journal is not exist with id:" + id));
		return Journal;
	}

	@Override
	public Journal saveJournal(Journal Journal) {
		return journalRepository.save(Journal);
	}

	@Override
	public void deleteJournalById(Long id) {
		Journal Journal = getJournalById(id);
		journalRepository.delete(Journal);
	}

	@Override
	public Journal updateJournalById(Long id, Journal newJournal) {
		Journal Journal = getJournalById(id);
		Journal.changeJournalData(newJournal);
		return journalRepository.save(Journal);
	}

}
