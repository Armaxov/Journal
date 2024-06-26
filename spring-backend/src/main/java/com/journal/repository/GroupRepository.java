package com.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.journal.entity.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long>{

}
