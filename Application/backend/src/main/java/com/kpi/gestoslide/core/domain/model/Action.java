package com.kpi.gestoslide.core.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "ACTION")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Action {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    @Enumerated(EnumType.STRING)
    private ActionName name;

    @Column(name = "DESCRIPTION")
    private String description;

    @OneToMany(mappedBy = "action")
    private List<GestureAction> gestureAction;
}

