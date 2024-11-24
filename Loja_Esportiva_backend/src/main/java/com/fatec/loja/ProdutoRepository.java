package com.fatec.loja;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends
JpaRepository<Produto, Integer>{
    
    @Query(value = "select * from produto where nome=?1", nativeQuery = true)
    List<Produto> fazerBusca(String nome);

    @Query(value = "select * from produto where destaque > 0 ", nativeQuery = true)
    List<Produto> listarVitrine();

}
