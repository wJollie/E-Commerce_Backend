const seedCategories = require("./category-seeds");
const seedProducts = require("./product-seeds");
const seedTags = require("./tag-seeds");
const seedProductTags = require("./product-tag-seeds");

const sequelize = require("../config/connection");
const { Category, Product, Tag, ProductTag } = require("../models");

const seedAll = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
    await sequelize.sync({ force: true });

    // Drop the tables in the reverse order they were created
    await ProductTag.drop();
    await Tag.drop();
    await Product.drop();
    await Category.drop();

    // Enable foreign key checks
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });

    // Sync models after dropping tables
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await seedCategories();
    console.log("\n----- CATEGORIES SEEDED -----\n");

    await seedProducts();
    console.log("\n----- PRODUCTS SEEDED -----\n");

    await seedTags();
    console.log("\n----- TAGS SEEDED -----\n");

    await seedProductTags();
    console.log("\n----- PRODUCT TAGS SEEDED -----\n");
  } catch (err) {
    console.error("Error seeding database:", err);
  }

  process.exit(0);
};

seedAll();
