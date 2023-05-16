package com.kpi.gestoslide.dto.tree;


import java.util.List;

public record TreeNode<T>(
        String label,
        boolean leaf,
        T data,
        List<TreeNode<T>> children
) {
}
