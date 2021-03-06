var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//课堂信息表
var LessonSchema = new Schema({
  
  //课堂名
  name:{
    type: String,
  },
  
  //课堂代号
  lessonCode:{
     type: Number,
  },
  
  //课堂老师id
  teacherId:{
   type: ObjectId,
  },
   
  //课堂学生数
  lessonStudentNumber: Number,
  
  //班级id组
  classIdGroup:[{
   type: ObjectId,
  }],
  
  //母卷id组
  motherPaperIdGroup:[{
   type: ObjectId,
  }],

  //做卷集id组
  answerPaperCollectionIdGroup:[{
   type: ObjectId,
  }],
  
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

LessonSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

LessonSchema.statics = {
  fetch: function(cb) {//fetch方法取出目前数据库所有数据
    return this
      .find({})
      .sort('meta.updateAt')//按更新时间排序
      .exec(cb)//执行回调方法
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = LessonSchema