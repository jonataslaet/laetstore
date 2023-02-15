package com.github.jonataslaet.laetstore.config;

import com.github.jonataslaet.laetstore.entity.Product;
import com.github.jonataslaet.laetstore.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

  private EntityManager entityManager;

  public MyDataRestConfig(EntityManager theEntityManager) {
    this.entityManager = theEntityManager;
  }
  
  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                   CorsRegistry cors) {
    HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
    config.getExposureConfiguration()
        .forDomainType(Product.class)
        .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
        .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    config.getExposureConfiguration()
        .forDomainType(ProductCategory.class)
        .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
        .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    exposeIds(config);
  }

  private void exposeIds(RepositoryRestConfiguration config) {
    Set<EntityType<?>> entityTypes = entityManager.getMetamodel().getEntities();
    List<Class> entityClasses = new ArrayList<>();
    for(EntityType entityType: entityTypes) {
      entityClasses.add(entityType.getJavaType());
    }
    Class[] domainTypes = entityClasses.toArray(new Class[0]);
    config.exposeIdsFor(domainTypes);
  }
}
