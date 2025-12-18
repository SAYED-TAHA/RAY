import express from 'express';
import Job from '../../models/Job.js';

const router = express.Router();

// جلب جميع الوظائف
router.get('/', (req, res) => {
  (async () => {
    try {
      const jobs = await Job.find({}).sort({ createdAt: -1 });
      res.json(jobs);
    } catch (error) {
      console.error('Get jobs error:', error);
      res.status(500).json({ error: 'خطأ في جلب الوظائف' });
    }
  })();
});

// جلب وظيفة واحدة
router.get('/:id', (req, res) => {
  (async () => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ error: 'الوظيفة غير موجودة' });
      }
      res.json(job);
    } catch (error) {
      console.error('Get job error:', error);
      res.status(500).json({ error: 'خطأ في جلب الوظيفة' });
    }
  })();
});

// إضافة وظيفة جديدة
router.post('/', (req, res) => {
  (async () => {
    try {
      const job = await Job.create(req.body);
      res.status(201).json(job);
    } catch (error) {
      console.error('Create job error:', error);
      res.status(500).json({ error: 'خطأ في إضافة الوظيفة' });
    }
  })();
});

export default router;
