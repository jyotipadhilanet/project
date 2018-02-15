var CategorySchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        default: '',
        trim: true,
        unique: [true, 'Category name already exists'],
        required: [true, 'Category Name cannot be blank'],
        minlength: [4, 'Minimum 4 characters required'],
        maxlength: [20, 'Category name cannot be That long']
    },
    parentCategory: {
        type: String,
        lowercase: true,
        default: '',
        trim: true
    },
    description: {
        type: String,
        lowercase: true,
        default: '',
        trim: true,
        required: [true, 'description cannot be blank'],
        minlength: [10, 'Very short description']
    },
    slug: {
        type: String,
        lowercase: true,
        unique: [true, 'Slug must be unique'],
        required: true,
        minlength: [4, "Minimum 4 Charater required"],
        maxlength: [20, "Slug cannot be that long"]
    },
    imageUrl: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
});

module.exports = mongoose.model('Category', CategorySchema);


//i am insert data using mongoose models like this

exports.createCategory = function (request, response) {

    var newCategory = {
        "name": request.body.categoryName,
        "parentCategory": request.body.parentCategory,
        "description": request.body.description,
        "slug": request.body.slug,
        "imageUrl": request.body.categoryImage,
        "updated": new Date()
    }

    var category = new Category(newCategory);

    category.save()
        .then(function (category) {
            sendResponse(response, 201, "success", category);
        })
        .catch(function (error) {
            sendResponse(response, 400, "error", error);
        });
};