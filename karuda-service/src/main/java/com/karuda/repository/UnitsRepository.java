package com.karuda.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karuda.domain.UnitType;
import com.karuda.domain.UnitTypes;

@Repository
public interface UnitsRepository extends JpaRepository<UnitType, Long> {
	
	Optional<UnitType> findByType(UnitTypes roleName);
}
