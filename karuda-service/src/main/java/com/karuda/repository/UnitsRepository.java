package com.karuda.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karuda.domain.UnitType;

@Repository
public interface UnitsRepository extends JpaRepository<UnitType, Long> {
}
