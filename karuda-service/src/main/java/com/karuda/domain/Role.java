package com.karuda.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.NaturalId;

import lombok.Data;

@Entity
@Data
@Table(name = "roles", uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }) })
public class Role {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
	private RoleName name;
}
