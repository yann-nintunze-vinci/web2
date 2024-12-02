import { Router } from "express";
import { authorize } from "../utils/auths";

const router = Router();

router.get("/", (req, res) => {
    req.query;

    return res.json();
});

router.get("/:id", (req, res) => {
    req.params;

    return res.json();
});

router.post("/", authorize, (req, res) => {
    req.body;

    return res.json();
});

router.delete("/:id", authorize, (req, res) => {
    req.params;

    return res.json();
});

router.patch("/:id", authorize, (req, res) => {
    req.body;
    req.params;

    return res.json();
});

export default router;
