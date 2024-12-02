package com.fatec.loja;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends
JpaRepository<Produto, Integer>{
@Query(value = "select * from produto where destaque>0 order by destaque",
 nativeQuery = true)
List<Produto> listarVitrine();

@Query(value = "select * from produto where keywords like ?1 order by nome",
nativeQuery = true)
List<Produto> fazerBusca(String termo);


}
