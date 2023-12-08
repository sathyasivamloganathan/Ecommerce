import categoryModal from "../modals/categoryModal.js"
import slugify from "slugify"

export const createCategoryController = async(req,res) => {
    try{
        const {name} = req.body
        if(!name){
            return res.status(400).send({
                success: false,
                message: 'Name is required'
            })
        }
        const existingCategory = await categoryModal.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            })
        }
        const category = await new categoryModal({name, slug:slugify(name)}).save();
        res.status(200).send({
            success: true,
            message: 'New Category Created',
            category,
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            err,
            message: 'Error in category'
        })
    }
}

export const updateCategoryController = async(req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModal.findByIdAndUpdate(id, {name, slug:slugify(name)},{new:true})
        res.status(200).send({
            success: true,
            category,
            message: "Category Updated"
        })
    } 
    catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            err,
            message: "Error in Update controller"
        })
    }
}

export const categoryController = async(req,res) => {
    try{
        const category = await categoryModal.find({})
        res.status(200).send({
            success: true,
            message: "All Categoies",
            category,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            err,
            message: "Error at All Category"
        })
    }
}

export const singleCategoryController = async(req,res) => {
    try {
        const category = await categoryModal.find({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: "Single Category",
            category
        })
    } 
    catch (err){
        console.log(err);
        return res.status(500).send({
            success: false,
            err,
            message: "Error at Single-Category"
        })
    }
}

export const deleteCategoryController = async(req,res) => {
    try{
        const {id} = req.params;
        const category = await categoryModal.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted",
            category
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            err,
            message: "Error at Delete Category"
        })
    }
}