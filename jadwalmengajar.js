// ============================================================
// MASTER DATA GURU DAN JADWAL MENGAJAR
// SMK NEGERI 2 TERBANGGI BESAR
// Teknik Konstruksi dan Bangunan
// Semester Ganjil Tahun Pelajaran 2026/2027
// ============================================================

const ALL_TEACHERS = [
    {
        name: "HARYADI, S.T.",
        schedule: {
            "Senin": [
                { hours: [1, 4], class: "XII DPIB 2" },
                { hours: [7, 10], class: "XII TKP" }
            ],
            "Selasa": [
                { hours: [1, 8], class: "XI DPIB 2" }
            ],
            "Rabu": [
                { hours: [5, 8], class: "XII DPIB 1" }
            ],
            "Jumat": [
                { hours: [1, 8], class: "XI DPIB 1" }
            ]
        }
    },

    {
        name: "MAYEZA EKA PUTRA, S.Ars.",
        schedule: {
            "Senin": [
                { hours: [5, 6], class: "X TKP" }
            ],
            "Selasa": [
                { hours: [1, 6], class: "XI DPIB 1" }
            ],
            "Rabu": [
                { hours: [1, 6], class: "X TKP" }
            ],
            "Kamis": [
                { hours: [1, 4], class: "XI TKP" }
            ],
            "Jumat": [
                { hours: [1, 6], class: "XI DPIB 2" }
            ]
        }
    },

    {
        name: "NITA YULIANTI, S.T.",
        schedule: {
            "Senin": [
                { hours: [1, 4], class: "X TKP" }
            ],
            "Selasa": [
                { hours: [1, 8], class: "XI TKP" }
            ],
            "Rabu": [
                { hours: [1, 6], class: "XII TKP" }
            ],
            "Jumat": [
                { hours: [1, 6], class: "XII TKP" }
            ]
        }
    },

    {
        name: "SAYIDATI NISA, S.Ars.",
        schedule: {
            "Senin": [
                { hours: [1, 5], class: "XI DPIB 1" }
            ],
            "Selasa": [
                { hours: [1, 6], class: "X DPIB 1" }
            ],
            "Rabu": [
                { hours: [1, 6], class: "X DPIB 2" }
            ],
            "Kamis": [
                { hours: [1, 5], class: "XI DPIB 2" }
            ]
        }
    },

    {
        name: "SIGIT KRISTIAWAN, S.T.",
        schedule: {
            "Senin": [
                { hours: [1, 10], class: "XII DPIB 1" }
            ],
            "Rabu": [
                { hours: [1, 4], class: "XI DPIB 2" }
            ],
            "Kamis": [
                { hours: [1, 10], class: "XII DPIB 2" }
            ]
        }
    },

    {
        name: "SLAMET HARYANTO, S.T.",
        schedule: {
            "Jumat": [
                { hours: [6, 10], class: "XI TKP" }
            ]
        }
    },

    {
        name: "SUDARSONO, S.T., M.M.Pd.",
        schedule: {
            "Selasa": [
                { hours: [7, 10], class: "XI DPIB 1" }
            ],
            "Jumat": [
                { hours: [7, 10], class: "XI DPIB 2" }
            ]
        }
    },

    {
        name: "SURATMAN, S.T.",
        schedule: {
            "Senin": [
                { hours: [1, 10], class: "XI TKP" }
            ],
            "Selasa": [
                { hours: [1, 10], class: "XII TKP" }
            ],
            "Kamis": [
                { hours: [1, 5], class: "XII TKP" }
            ]
        }
    },

    {
        name: "UNTUNG HERMAWAN, S.T.",
        schedule: {
            "Senin": [
                { hours: [5, 8], class: "XII DPIB 2" }
            ],
            "Rabu": [
                { hours: [1, 4], class: "XII DPIB 1" },
                { hours: [6, 9], class: "XI DPIB 1" }
            ],
            "Kamis": [
                { hours: [1, 6], class: "X DPIB 2" }
            ],
            "Jumat": [
                { hours: [1, 6], class: "X DPIB 1" }
            ]
        }
    },

    {
        name: "YULIDAR EFFENDI, S.T.",
        schedule: {
            "Selasa": [
                { hours: [3, 9], class: "XII DPIB 1" }
            ],
            "Rabu": [
                { hours: [3, 9], class: "XII DPIB 2" }
            ],
            "Jumat": [
                { hours: [1, 5], class: "XII DPIB 1" },
                { hours: [6, 10], class: "XII DPIB 2" }
            ]
        }
    }
];

// ============================================================
// PENGATURAN JADWAL KELAS XII
// true  = jadwal kelas XII dinonaktifkan selama PKL
// false = seluruh jadwal kelas XII diaktifkan kembali
// ============================================================

const DISABLE_XII_DURING_PKL = true;

const TEACHERS = ALL_TEACHERS
    .map(teacher => {
        const activeSchedule = {};

        Object.entries(teacher.schedule).forEach(([day, slots]) => {
            const filteredSlots = slots.filter(slot => {
                const isClassXII = slot.class.startsWith("XII ");

                return !(DISABLE_XII_DURING_PKL && isClassXII);
            });

            if (filteredSlots.length > 0) {
                activeSchedule[day] = filteredSlots;
            }
        });

        return {
            ...teacher,
            schedule: activeSchedule
        };
    })
    // Guru tanpa jadwal aktif tidak ditampilkan sementara
    .filter(teacher => Object.keys(teacher.schedule).length > 0);