package com.kpi.gestoslide.core.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "GESTURE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Gesture {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    @Enumerated(EnumType.STRING)
    private GestureName name;

    @OneToMany(mappedBy = "gesture")
    private List<GestureAction> gestureAction;
}
