const createError = require("http-errors");
const productModel = require("./product.model");
const logger = require("../../config/logLevels");

module.exports = {
  getProductsByProvider: async (req, res, next) => {
    let products = await productModel.getProductsByProvider(
      req.con,
      req.params.providerId
    );
    if (products instanceof Error) {
      logger.error(
        "Error en modulo product (GET /provider/:providerId - getProductsByProvider())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener productos asociados a un proveedor [PROVIDER_ID: ${req.params.providerId}] (${products.message})`
        )
      );
    } else {
      logger.info(
        `Listado de productos asociados a un proveedor entregados satifactoriamente [PROVIDER_ID: ${req.params.providerId}]`
      );
      res.json({
        products: products,
        results: products.length,
        obtained: true,
      });
    }
  },
  getProductsByOffer: async (req, res, next) => {
    let products = await productModel.getProductsByOffer(
      req.con,
      req.params.offerId
    );
    if (products instanceof Error) {
      logger.error(
        "Error en modulo product (GET /offer/:offerId - getProductsByOffer())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener productos dada una oferta [OFFER_ID: ${req.params.offerId}] (${products.message})`
        )
      );
    } else {
      logger.info(
        `Listado de productos por oferta entregado satisfactoriamente [OFFER_ID: ${req.params.offerId}]`
      );
      res.json({
        products: products,
        results: products.length,
        obtained: true,
      });
    }
  },
  getProductsByCategory: async (req, res, next) => {
    let products = await productModel.getProductsByCategory(
      req.con,
      req.params.categoryId
    );
    if (products instanceof Error) {
      logger.error(
        "Error en modulo product (GET /category/:categoryId - getProductsByCategory())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener productos por una categoría [CATEGORY_ID: ${req.params.categoryId}] (${products.message})`
        )
      );
    } else {
      logger.info(
        `Listado de productos por categoría entregado satisfactoriamente [CATEGORY_ID: ${req.params.categoryId}]`
      );
      res.json({
        products: products,
        results: products.length,
        obtained: true,
      });
    }
  },
  getProductDetail: async (req, res, next) => {
    let product = await productModel.getProductDetail(
      req.con,
      req.params.postId
    );
    let qualifications = await productModel.getProductQualification(
      req.con,
      req.params.postId
    );
    if (product instanceof Error || qualifications instanceof Error) {
      logger.error(
        "Error en modulo product (GET /product/:postId - getProductDetail())"
      );
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener el detalle de una publicación [PRODUCT_PROVIDER_ID: ${req.params.postId}] (${product.message})`
        )
      );
    } else {
      logger.info(
        `Se entregó el detalle de la publicación satisfactoriamente [PRODUCT_PROVIDER_ID: ${req.params.postId}] ${req.params.postId}`
      );
      res.json({
        product: product,
        qualifications: qualifications,
        obtained: true,
      });
    }
  },
  getAllProducts: async (req, res, next) => {
    let product = await productModel.getAllProducts(req.con);
    if (product instanceof Error) {
      logger.error("Error en módulo product (GET /product - getAllProducts())");
      res.json({ obtained: false });
      next(
        createError(
          500,
          `Error al obtener los productos registrados (${product.message})`
        )
      );
    } else {
      logger.info(`Se entregó la lista de productos satisfactoriamente`);
      res.json({
        product: product,
        obtained: true,
      });
    }
  },
  createPost: async (req, res, next) => {
    let product;
    let post;
    let product_id;
    if (req.body.new_product == true) {
      product = await productModel.createProduct(req.con, req.body.product);

      if (!(product instanceof Error)) {
        post = await productModel.createPost(
          req.con,
          req.body,
          product[0].product_id
        );
        product_id = product[0].product_id;
      }
    } else {
      product_id = req.body.product;
      post = await productModel.createPost(req.con, req.body, req.body.product);
    }

    if (product instanceof Error || post instanceof Error) {
      logger.error("Error en módulo product (POST /product - createPost())");
      res.json({ created: false });
      next(
        createError(
          500,
          `Error al crear una nueva publicación ${
            product instanceof Error
              ? product.message
              : `[PRODUCT_NAME: ${req.body.product.product_name}] (No hay problemas en el producto)`
          } | ${
            post instanceof Error
              ? post.message
              : `[PROVIDER_ID: ${req.body.provider_id}] (No hay problemas en la publicación)`
          }`
        )
      );
    } else {
      logger.info(
        `Se creo una publicación satisfactoriamente [PRODUCT_PROVIDER_ID: ${post[0].product_provider_id}]`
      );
      res.json({ created: true, product_id: product_id });
    }
  },
  purchasedProductsOfUser: async (req, res, next) => {
    let product = await productModel.getPurchasedProducts(req);
    if (product.length === 0) {
      res.json({
        message:
          "Operacion invalida, no se pueden calificar productos no comprados",
      });
      return next(
        createError(
          404,
          `Operacion invalida, no se puede calificar el producto (PRODUC_ID:${req.params.productProviderId}), (ID:${req.params.productProviderId}), [USER_ID: ${req.user_id}]`
        )
      );
    }
    next();
  },
  rateProduct: async (req, res, next) => {
    let qualification = await productModel.createProductQualification(req);
    if (qualification instanceof Error) {
      logger.error(
        "Error en módulo product (POST /user/product/:productProviderId/qualification - rateProduct())"
      );
      res.json({ rated: false });
      return next(
        createError(
          500,
          `Error al crear la calificación del producto [PRODUCT_ID: ${req.params.productProviderId}] (${qualification.message})`
        )
      );
    } else {
      logger.info(
        `Producto calificado satisfactoriamente [PRODUCT_ID: ${req.params.productProviderId}]`
      );
      res.json({
        rated: true,
      });
    }
  },
  updateProductPhoto: async (req, res, next) => {
    let product = await productModel.updateProductPhoto(
      req.con,
      req.body.product_id,
      req.body.photo
    );
    if (product instanceof Error) {
      logger.error(
        "Error en módulo product (PUT /product/photo - updateProductPhoto())"
      );
      res.json({ updated: false });
      return next(
        createError(
          500,
          `Error al actualizar la foto del producto [PRODUCT_ID: ${req.body.product_id}] (${product.message})`
        )
      );
    } else {
      logger.info(
        `Foto de producto actualizada satisfactoriamente [PRODUCT_ID: ${req.body.product_id}]`
      );
      res.json({
        updated: true,
      });
    }
  },
  getProductsByKeyword: async (req, res, next) => {
    let products = await productModel.getProductsByKeyword(
      req.con,
      req.params.keyword
    );
    let categories = await productModel.getCategoriesByKeyword(
      req.con,
      req.params.keyword
    );
    if (products instanceof Error || categories instanceof Error) {
      logger.error(
        "Error en módulo product (GET /product/search/ - getProductsByKeyword() | getCategoriesByKeyword())"
      );
      res.json({ obtained: false });
      return next(
        createError(
          500,
          `Error al buscar productos y categorías por el keyword [KEYWORD: ${
            req.params.keyword
          }] (${
            products.message instanceof Error
              ? products.message
              : categories.message
          })`
        )
      );
    } else {
      logger.info(
        `Productos y categorías entregados satisfactoriamente [KEYWORD: ${req.params.keyword}]`
      );
      res.json({
        obtained: true,
        products: products,
        categories: categories,
      });
    }
  },
};
