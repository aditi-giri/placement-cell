import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true,
    },
    job_description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary_package: {
        type: String,
        default: '',
    },
    // job_type: {
    //     type: String,
    //     enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
    //     required: true,
    // },
    skills_required: {
        type: [String],
        default: [],
    },
});

const JobPostSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    company_website_url: {
        type: String,
        required: true,
    },
    job: {
        type: JobSchema,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: "Deadline must be in the future",
        },
    },
    applicants: [
        {
            student_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
            appliedOn: {
                type: Date,
                default: Date.now,
            },
            status: {
                type: Boolean,
                default: null,
            },
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Post = mongoose.model('Post', JobPostSchema);

export default Post;