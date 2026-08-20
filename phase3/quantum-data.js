window.quantumData = {
  "queryModel": {
    "title": "نموذج الاستعلام الكمي — Quantum query model",
    "description": "دالة مخفية Hidden function داخل Oracle. غيّر فقط القيم المسموحة. المصطلح الإنجليزي مكتوب بجانب العربي حتى لا يختلط المعنى.",
    "modules": [
      {
        "id": "oracles",
        "name": "1. أوراكل دالة واحدة — Oracle (1-bit)",
        "en": "Boolean oracle / black box",
        "file": "query/one_bit_oracles.py",
        "command": "python -m query.one_bit_oracles",
        "physics": "الدالة المخفية Hidden function f تأخذ بتًا واحدًا وتعيد بتًا واحدًا. في الكم لا نكتب f(x) مباشرة؛ نضعها داخل بوابة عكسية reversible gate اسمها Oracle: U_f.",
        "formula": "U_f |x, y⟩ = |x, y ⊕ f(x)⟩",
        "params": [
          {
            "name": "kind",
            "meaning": "أي دالة من الأربع دوال الممكنة (function kind). لا يوجد خيار خامس.",
            "allowed": [
              "zero",
              "one",
              "identity",
              "not"
            ],
            "note": "4 احتمالات فقط",
            "table": [
              [
                "kind",
                "f(0)",
                "f(1)",
                "المعنى / meaning"
              ],
              [
                "zero",
                "0",
                "0",
                "constant 0 — ثابتة صفر"
              ],
              [
                "one",
                "1",
                "1",
                "constant 1 — ثابتة واحد"
              ],
              [
                "identity",
                "0",
                "1",
                "f(x) = x"
              ],
              [
                "not",
                "1",
                "0",
                "f(x) = 1−x"
              ]
            ]
          }
        ],
        "snippet": "from query.one_bit_oracles import make_oracle_1bit\n\n# غيّر kind إلى واحد فقط من: \"zero\" | \"one\" | \"identity\" | \"not\"\noracle = make_oracle_1bit(\"identity\")\nprint(oracle)",
        "expect": "identity تطبع بوابة CNOT. zero دائرة فارغة. one بوابة X على الهدف.",
        "full_code": "\"\"\"Q1 — One-bit Boolean oracles.\n\nStandard reversible oracle:\n\n    U_f |x, y> = |x, y XOR f(x)>\n\nq0 = input x\nq1 = target y\n\nFour functions f:{0,1}->{0,1}:\n    zero      f(x) = 0\n    one       f(x) = 1\n    identity  f(x) = x\n    not       f(x) = 1 XOR x\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit\n\nONE_BIT_KINDS = (\"zero\", \"one\", \"identity\", \"not\")\n\n\ndef make_oracle_1bit(kind: str) -> QuantumCircuit:\n    \"\"\"Return U_f for a one-bit Boolean function.\"\"\"\n    if kind not in ONE_BIT_KINDS:\n        raise ValueError(\"kind must be: zero, one, identity, or not\")\n\n    qc = QuantumCircuit(2, name=f\"U_{kind}\")\n\n    if kind == \"zero\":\n        pass\n    elif kind == \"one\":\n        qc.x(1)\n    elif kind == \"identity\":\n        qc.cx(0, 1)\n    elif kind == \"not\":\n        qc.x(1)\n        qc.cx(0, 1)\n\n    return qc\n\n\ndef main() -> None:\n    for kind in ONE_BIT_KINDS:\n        print(f\"\\nOracle: {kind}\")\n        print(make_oracle_1bit(kind))\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "kind",
            "identity"
          ]
        ],
        "example_code": "from query.one_bit_oracles import make_oracle_1bit\n\nkind = \"identity\"          # واحد من: zero | one | identity | not\noracle = make_oracle_1bit(kind)\nprint(oracle)",
        "readout": "لأن f(x)=x فإن الأوراكل هو CNOT: التحكم على المدخل والهدف ينقلب عندما x=1.",
        "run_output": "given: kind = 'identity'\nf(0)=0 , f(1)=1   →  الدائرة يجب أن تكون CNOT\n\n          \nq_0: ──■──\n     ┌─┴─┐\nq_1: ┤ X ├\n     └───┘\n",
        "case_groups": [
          {
            "name": "kind",
            "title": "اختر الدالة — function kind (4 only)"
          }
        ],
        "cases": [
          {
            "id": "zero",
            "label": "zero",
            "given": [
              [
                "kind",
                "zero"
              ]
            ],
            "example_code": "from query.one_bit_oracles import make_oracle_1bit\n\nkind = \"zero\"\nprint(make_oracle_1bit(kind))",
            "run_output": "given: kind = 'zero'\nf(0)=0, f(1)=0\n\n     \nq_0: \n     \nq_1:\n",
            "readout": "الدائرة فارغة: f لا تقلب الهدف أبدًا."
          },
          {
            "id": "one",
            "label": "one",
            "given": [
              [
                "kind",
                "one"
              ]
            ],
            "example_code": "from query.one_bit_oracles import make_oracle_1bit\n\nkind = \"one\"\nprint(make_oracle_1bit(kind))",
            "run_output": "given: kind = 'one'\nf(0)=1, f(1)=1\n\n          \nq_0: ─────\n     ┌───┐\nq_1: ┤ X ├\n     └───┘\n",
            "readout": "X على الهدف دائمًا: f=1 لكل المدخلات."
          },
          {
            "id": "identity",
            "label": "identity",
            "given": [
              [
                "kind",
                "identity"
              ]
            ],
            "example_code": "from query.one_bit_oracles import make_oracle_1bit\n\nkind = \"identity\"\nprint(make_oracle_1bit(kind))",
            "run_output": "given: kind = 'identity'\nf(0)=0, f(1)=1\n\n          \nq_0: ──■──\n     ┌─┴─┐\nq_1: ┤ X ├\n     └───┘\n",
            "readout": "CNOT: الهدف ينقلب فقط إذا x=1."
          },
          {
            "id": "not",
            "label": "not",
            "given": [
              [
                "kind",
                "not"
              ]
            ],
            "example_code": "from query.one_bit_oracles import make_oracle_1bit\n\nkind = \"not\"\nprint(make_oracle_1bit(kind))",
            "run_output": "given: kind = 'not'\nf(0)=1, f(1)=0\n\n               \nq_0: ───────■──\n     ┌───┐┌─┴─┐\nq_1: ┤ X ├┤ X ├\n     └───┘└───┘\n",
            "readout": "X ثم CNOT: الهدف ينقلب إذا x=0."
          }
        ]
      },
      {
        "id": "basis",
        "name": "2. استعلام أساس — Basis-state query",
        "en": "Basis-state query",
        "file": "query/basis_query.py",
        "command": "python -m query.basis_query",
        "physics": "نختار مدخلًا Input معروفًا x، نضع الهدف Target على |0⟩، ثم نسأل الـ Oracle مرة واحدة (Query). هذا يشبه التجربة الكلاسيكية: سؤال واحد → جواب واحد.",
        "formula": "|x, 0⟩  ⟶  |x, f(x)⟩",
        "params": [
          {
            "name": "kind",
            "meaning": "أي دالة مخفية.",
            "allowed": [
              "zero",
              "one",
              "identity",
              "not"
            ],
            "note": "4 احتمالات فقط"
          },
          {
            "name": "x",
            "meaning": "المدخل Input الذي تسأل عنه.",
            "allowed": [
              "0",
              "1"
            ],
            "note": "بت واحد: 0 أو 1 فقط"
          }
        ],
        "snippet": "from query.basis_query import basis_query\n\n# kind ∈ {zero, one, identity, not}\n# x ∈ {0, 1}\ncircuit, state = basis_query(\"identity\", x=1)\nprint(state.probabilities_dict())",
        "expect": "إذا kind=identity و x=1 تظهر الحالة 11 بيقين (المدخل 1 والناتج 1).",
        "full_code": "\"\"\"Q2 — Basis-state query.\n\nUses the oracle in the classical-looking way:\n\n1. Prepare a definite input x on q0.\n2. Leave the target q1 in |0>.\n3. Apply U_f once.\n4. Read the resulting statevector.\n\nFor f(x)=x (identity):\n    |0,0> -> |0,0>\n    |1,0> -> |1,1>\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n\nfrom query.one_bit_oracles import make_oracle_1bit\n\n\ndef basis_query(kind: str, x: int) -> tuple[QuantumCircuit, Statevector]:\n    if x not in (0, 1):\n        raise ValueError(\"x must be 0 or 1\")\n\n    qc = QuantumCircuit(2)\n    if x == 1:\n        qc.x(0)\n\n    oracle = make_oracle_1bit(kind).to_gate(label=\"U_f\")\n    qc.append(oracle, [0, 1])\n    return qc, Statevector.from_instruction(qc)\n\n\ndef main() -> None:\n    for x in (0, 1):\n        qc, state = basis_query(\"identity\", x)\n        print(f\"x = {x}\")\n        print(\"State probabilities:\", dict(state.probabilities_dict()))\n        print(qc)\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "kind",
            "identity"
          ],
          [
            "x",
            "1"
          ]
        ],
        "example_code": "from query.basis_query import basis_query\n\nkind = \"identity\"          # 4 دوال فقط\nx = 1                      # 0 أو 1 فقط\ncircuit, state = basis_query(kind, x)\nprint(circuit)\nprint(dict(state.probabilities_dict()))",
        "readout": "x=1 و f(1)=1 فالحالة النهائية 11 بيقين. لو x=0 لنفس الدالة لظهرت 00.",
        "run_output": "given: kind = 'identity' , x = 1\ncircuit:\n     ┌───┐┌──────┐\nq_0: ┤ X ├┤0     ├\n     └───┘│  U_f │\nq_1: ─────┤1     ├\n          └──────┘\nprobabilities: {'11': 1.0}\nmeaning: x=1 and f(1)=1  →  label 11 with probability 1\n",
        "case_groups": [
          {
            "name": "kind",
            "title": "الدالة — kind"
          },
          {
            "name": "x",
            "title": "المدخل — input x"
          }
        ],
        "cases": [
          {
            "id": "zero|0",
            "label": "zero, x=0",
            "given": [
              [
                "kind",
                "zero"
              ],
              [
                "x",
                "0"
              ]
            ],
            "example_code": "from query.basis_query import basis_query\n\nkind = \"zero\"\nx = 0\n_, state = basis_query(kind, x)\nprint(dict(state.probabilities_dict()))",
            "run_output": "given: kind='zero', x=0\nf(0)=0\nprobabilities: {'00': 1.0}\n",
            "readout": "المدخل 0 والناتج 0 → الحالة تُقرأ بهذا الزوج بيقين."
          },
          {
            "id": "zero|1",
            "label": "zero, x=1",
            "given": [
              [
                "kind",
                "zero"
              ],
              [
                "x",
                "1"
              ]
            ],
            "example_code": "from query.basis_query import basis_query\n\nkind = \"zero\"\nx = 1\n_, state = basis_query(kind, x)\nprint(dict(state.probabilities_dict()))",
            "run_output": "given: kind='zero', x=1\nf(1)=0\nprobabilities: {'01': 1.0}\n",
            "readout": "المدخل 1 والناتج 0 → الحالة تُقرأ بهذا الزوج بيقين."
          },
          {
            "id": "one|0",
            "label": "one, x=0",
            "given": [
              [
                "kind",
                "one"
              ],
              [
                "x",
                "0"
              ]
            ],
            "example_code": "from query.basis_query import basis_query\n\nkind = \"one\"\nx = 0\n_, state = basis_query(kind, x)\nprint(dict(state.probabilities_dict()))",
            "run_output": "given: kind='one', x=0\nf(0)=1\nprobabilities: {'10': 1.0}\n",
            "readout": "المدخل 0 والناتج 1 → الحالة تُقرأ بهذا الزوج بيقين."
          },
          {
            "id": "one|1",
            "label": "one, x=1",
            "given": [
              [
                "kind",
                "one"
              ],
              [
                "x",
                "1"
              ]
            ],
            "example_code": "from query.basis_query import basis_query\n\nkind = \"one\"\nx = 1\n_, state = basis_query(kind, x)\nprint(dict(state.probabilities_dict()))",
            "run_output": "given: kind='one', x=1\nf(1)=1\nprobabilities: {'11': 1.0}\n",
            "readout": "المدخل 1 والناتج 1 → الحالة تُقرأ بهذا الزوج بيقين."
          },
          {
            "id": "identity|0",
            "label": "identity, x=0",
            "given": [
              [
                "kind",
                "identity"
              ],
              [
                "x",
                "0"
              ]
            ],
            "example_code": "from query.basis_query import basis_query\n\nkind = \"identity\"\nx = 0\n_, state = basis_query(kind, x)\nprint(dict(state.probabilities_dict()))",
            "run_output": "given: kind='identity', x=0\nf(0)=0\nprobabilities: {'00': 1.0}\n",
            "readout": "المدخل 0 والناتج 0 → الحالة تُقرأ بهذا الزوج بيقين."
          },
          {
            "id": "identity|1",
            "label": "identity, x=1",
            "given": [
              [
                "kind",
                "identity"
              ],
              [
                "x",
                "1"
              ]
            ],
            "example_code": "from query.basis_query import basis_query\n\nkind = \"identity\"\nx = 1\n_, state = basis_query(kind, x)\nprint(dict(state.probabilities_dict()))",
            "run_output": "given: kind='identity', x=1\nf(1)=1\nprobabilities: {'11': 1.0}\n",
            "readout": "المدخل 1 والناتج 1 → الحالة تُقرأ بهذا الزوج بيقين."
          },
          {
            "id": "not|0",
            "label": "not, x=0",
            "given": [
              [
                "kind",
                "not"
              ],
              [
                "x",
                "0"
              ]
            ],
            "example_code": "from query.basis_query import basis_query\n\nkind = \"not\"\nx = 0\n_, state = basis_query(kind, x)\nprint(dict(state.probabilities_dict()))",
            "run_output": "given: kind='not', x=0\nf(0)=1\nprobabilities: {'10': 1.0}\n",
            "readout": "المدخل 0 والناتج 1 → الحالة تُقرأ بهذا الزوج بيقين."
          },
          {
            "id": "not|1",
            "label": "not, x=1",
            "given": [
              [
                "kind",
                "not"
              ],
              [
                "x",
                "1"
              ]
            ],
            "example_code": "from query.basis_query import basis_query\n\nkind = \"not\"\nx = 1\n_, state = basis_query(kind, x)\nprint(dict(state.probabilities_dict()))",
            "run_output": "given: kind='not', x=1\nf(1)=0\nprobabilities: {'01': 1.0}\n",
            "readout": "المدخل 1 والناتج 0 → الحالة تُقرأ بهذا الزوج بيقين."
          }
        ]
      },
      {
        "id": "super",
        "name": "3. استعلام على تراكب — Superposition query",
        "en": "Superposition query / quantum parallelism",
        "file": "query/superposition_query.py",
        "command": "python -m query.superposition_query",
        "physics": "نضع المدخل في Superposition: |+⟩ = (|0⟩+|1⟩)/√2. استعلام Query واحد يمسّ الفرعين معًا. القياس Measurement يعطي نتيجة كلاسيكية واحدة — ليس جدول الحقيقة Truth table كاملًا.",
        "formula": "U_f |+⟩|0⟩ = (|0,f(0)⟩ + |1,f(1)⟩)/√2",
        "params": [
          {
            "name": "kind",
            "meaning": "الدالة المخفية.",
            "allowed": [
              "zero",
              "one",
              "identity",
              "not"
            ],
            "note": "4 احتمالات فقط"
          }
        ],
        "snippet": "from query.superposition_query import superposition_query, superposition_counts\n\n# kind ∈ {zero, one, identity, not}\nqc = superposition_query(\"identity\")\nprint(qc)\nprint(superposition_counts(\"identity\", shots=2000))",
        "expect": "لـ identity: حوالي نصف التجارب 00 ونصفها 11. لا تظهر 01 ولا 10.",
        "full_code": "\"\"\"Q3 — Superposition query.\n\nPrepare |+> on the input and query f(x)=x once:\n\n    U_f (|0> + |1>)/sqrt(2) |0>  =  (|00> + |11>)/sqrt(2)\n\nOne oracle call acts on both branches. Measurement still returns\nonly one classical pair per shot — not the full truth table.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit, transpile\nfrom qiskit.quantum_info import Statevector\nfrom qiskit_aer import AerSimulator\n\nfrom query.one_bit_oracles import make_oracle_1bit\n\n\ndef superposition_query(kind: str = \"identity\") -> QuantumCircuit:\n    qc = QuantumCircuit(2)\n    qc.h(0)\n    oracle = make_oracle_1bit(kind).to_gate(label=\"U_f\")\n    qc.append(oracle, [0, 1])\n    return qc\n\n\ndef superposition_state(kind: str = \"identity\") -> Statevector:\n    return Statevector.from_instruction(superposition_query(kind))\n\n\ndef superposition_counts(kind: str = \"identity\", shots: int = 2000) -> dict[str, int]:\n    measured = superposition_query(kind)\n    measured.measure_all()\n    simulator = AerSimulator()\n    compiled = transpile(measured, simulator)\n    return simulator.run(compiled, shots=shots).result().get_counts()\n\n\ndef main() -> None:\n    qc = superposition_query()\n    state = superposition_state()\n    print(qc)\n    print(\"Statevector:\", state)\n    print(\"Probabilities:\", dict(state.probabilities_dict()))\n    print(\"Shot counts:\", superposition_counts())\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "kind",
            "identity"
          ],
          [
            "shots",
            "2000"
          ]
        ],
        "example_code": "from query.superposition_query import superposition_query, superposition_counts\nfrom qiskit.quantum_info import Statevector\n\nkind = \"identity\"\nqc = superposition_query(kind)\nprint(qc)\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))\nprint(superposition_counts(kind, shots=2000))",
        "readout": "كل رمية 00 أو 11. المحاكي لا يطبع جدول f كاملًا من قياس واحد.",
        "run_output": "given: kind = 'identity' , shots = 2000\ncircuit:\n     ┌───┐┌──────┐\nq_0: ┤ H ├┤0     ├\n     └───┘│  U_f │\nq_1: ─────┤1     ├\n          └──────┘\nideal probabilities: {'00': 0.5, '11': 0.5}\nsimulator counts: {'11': 1021, '00': 979}\nmeaning: each shot is 00 or 11, never the full truth table\n",
        "case_groups": [
          {
            "name": "kind",
            "title": "اختر الدالة — kind"
          }
        ],
        "cases": [
          {
            "id": "zero",
            "label": "zero",
            "given": [
              [
                "kind",
                "zero"
              ]
            ],
            "example_code": "from query.superposition_query import superposition_query\nfrom qiskit.quantum_info import Statevector\n\nqc = superposition_query(\"zero\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
            "run_output": "given: kind='zero'\nprobabilities: {'00': 0.5, '01': 0.5}\n",
            "readout": "الهدف يبقى 0: تظهر 00 و 01."
          },
          {
            "id": "one",
            "label": "one",
            "given": [
              [
                "kind",
                "one"
              ]
            ],
            "example_code": "from query.superposition_query import superposition_query\nfrom qiskit.quantum_info import Statevector\n\nqc = superposition_query(\"one\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
            "run_output": "given: kind='one'\nprobabilities: {'10': 0.5, '11': 0.5}\n",
            "readout": "الهدف دائمًا 1: تظهر 10 و 11."
          },
          {
            "id": "identity",
            "label": "identity",
            "given": [
              [
                "kind",
                "identity"
              ]
            ],
            "example_code": "from query.superposition_query import superposition_query\nfrom qiskit.quantum_info import Statevector\n\nqc = superposition_query(\"identity\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
            "run_output": "given: kind='identity'\nprobabilities: {'00': 0.5, '11': 0.5}\n",
            "readout": "ارتباط x مع f(x): 00 و 11 فقط."
          },
          {
            "id": "not",
            "label": "not",
            "given": [
              [
                "kind",
                "not"
              ]
            ],
            "example_code": "from query.superposition_query import superposition_query\nfrom qiskit.quantum_info import Statevector\n\nqc = superposition_query(\"not\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
            "run_output": "given: kind='not'\nprobabilities: {'01': 0.5, '10': 0.5}\n",
            "readout": "ارتباط عكسي: 01 و 10 فقط."
          }
        ]
      },
      {
        "id": "kickback",
        "name": "4. Phase kickback — ارتداد الطور",
        "en": "Phase kickback",
        "file": "query/phase_kickback.py",
        "command": "python -m query.phase_kickback",
        "physics": "نضع الهدف Target في |−⟩ بدل |0⟩. قيمة f لا تُكتب كبت Bit، بل كطور Phase ±1. بوابة Hadamard بعد ذلك تحوّل الطور إلى بت يمكن قياسه. هذه فكرة خوارزمية Deutsch.",
        "formula": "U_f |x⟩|−⟩ = (−1)^{f(x)} |x⟩|−⟩",
        "params": [
          {
            "name": "kind",
            "meaning": "الدالة المخفية.",
            "allowed": [
              "zero",
              "one",
              "identity",
              "not"
            ],
            "note": "4 احتمالات فقط"
          }
        ],
        "snippet": "from query.phase_kickback import kickback_readout\nfrom qiskit.quantum_info import Statevector\n\n# kind ∈ {zero, one, identity, not}\nqc = kickback_readout(\"identity\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
        "expect": "لـ identity (دالة متوازنة) كيوبت المدخل ينتهي |1⟩. للدوال الثابتة ينتهي |0⟩.",
        "full_code": "\"\"\"Q4 — Phase kickback.\n\nPrepare the target in |-> = (|0> - |1>)/sqrt(2).\nBecause X|-> = -|->, the bit oracle becomes a phase oracle:\n\n    U_f |x> |->  =  (-1)^{f(x)} |x> |->\n\nThen a Hadamard on the input converts that relative phase\ninto a computational-basis bit. For f(x)=x the input becomes |1>.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n\nfrom query.one_bit_oracles import make_oracle_1bit\n\n\ndef minus_state_circuit() -> QuantumCircuit:\n    \"\"\"|0> -X-> |1> -H-> |->\"\"\"\n    qc = QuantumCircuit(1, name=\"minus\")\n    qc.x(0)\n    qc.h(0)\n    return qc\n\n\ndef kickback_circuit(kind: str = \"identity\") -> QuantumCircuit:\n    qc = QuantumCircuit(2)\n    qc.h(0)\n    qc.x(1)\n    qc.h(1)\n    oracle = make_oracle_1bit(kind).to_gate(label=\"U_f\")\n    qc.append(oracle, [0, 1])\n    return qc\n\n\ndef kickback_readout(kind: str = \"identity\") -> QuantumCircuit:\n    qc = kickback_circuit(kind)\n    qc.h(0)\n    return qc\n\n\ndef main() -> None:\n    minus = minus_state_circuit()\n    print(\"Minus circuit:\")\n    print(minus)\n    print(Statevector.from_instruction(minus))\n\n    kb = kickback_circuit()\n    print(\"\\nKickback circuit:\")\n    print(kb)\n    print(Statevector.from_instruction(kb))\n\n    readout = kickback_readout()\n    print(\"\\nAfter interference H on q0:\")\n    print(readout)\n    print(\"Final probabilities:\", dict(Statevector.from_instruction(readout).probabilities_dict()))\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "kind",
            "identity"
          ]
        ],
        "example_code": "from query.phase_kickback import kickback_readout\nfrom qiskit.quantum_info import Statevector\n\nkind = \"identity\"          # جرّب أيضًا zero لترى المدخل |0⟩\nqc = kickback_readout(kind)\nprint(qc)\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
        "readout": "الدالة متوازنة، فبعد التداخل يُقرأ المدخل 1. دالة ثابتة (zero أو one) تُقرأ 0.",
        "run_output": "given: kind = 'identity'\ncircuit:\n     ┌───┐     ┌──────┐┌───┐\nq_0: ┤ H ├─────┤0     ├┤ H ├\n     ├───┤┌───┐│  U_f │└───┘\nq_1: ┤ X ├┤ H ├┤1     ├─────\n     └───┘└───┘└──────┘     \nprobabilities: {'01': 0.5, '11': 0.5}\nmeaning: balanced f  →  input qubit reads as 1 after interference\n",
        "case_groups": [
          {
            "name": "kind",
            "title": "اختر الدالة — kind (Deutsch bit)"
          }
        ],
        "cases": [
          {
            "id": "zero",
            "label": "zero",
            "given": [
              [
                "kind",
                "zero"
              ]
            ],
            "example_code": "from query.phase_kickback import kickback_readout\nfrom qiskit.quantum_info import Statevector\n\nqc = kickback_readout(\"zero\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
            "run_output": "given: kind='zero'\nprobabilities: {'00': 0.5, '10': 0.5}\nDeutsch bit (q0) = 0 (ثابتة)\n",
            "readout": "بعد التداخل يُقرأ المدخل 0 (ثابتة). الثابتة → 0 والمتوازنة → 1."
          },
          {
            "id": "one",
            "label": "one",
            "given": [
              [
                "kind",
                "one"
              ]
            ],
            "example_code": "from query.phase_kickback import kickback_readout\nfrom qiskit.quantum_info import Statevector\n\nqc = kickback_readout(\"one\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
            "run_output": "given: kind='one'\nprobabilities: {'00': 0.5, '10': 0.5}\nDeutsch bit (q0) = 0 (ثابتة)\n",
            "readout": "بعد التداخل يُقرأ المدخل 0 (ثابتة). الثابتة → 0 والمتوازنة → 1."
          },
          {
            "id": "identity",
            "label": "identity",
            "given": [
              [
                "kind",
                "identity"
              ]
            ],
            "example_code": "from query.phase_kickback import kickback_readout\nfrom qiskit.quantum_info import Statevector\n\nqc = kickback_readout(\"identity\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
            "run_output": "given: kind='identity'\nprobabilities: {'01': 0.5, '11': 0.5}\nDeutsch bit (q0) = 1 (متوازنة)\n",
            "readout": "بعد التداخل يُقرأ المدخل 1 (متوازنة). الثابتة → 0 والمتوازنة → 1."
          },
          {
            "id": "not",
            "label": "not",
            "given": [
              [
                "kind",
                "not"
              ]
            ],
            "example_code": "from query.phase_kickback import kickback_readout\nfrom qiskit.quantum_info import Statevector\n\nqc = kickback_readout(\"not\")\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
            "run_output": "given: kind='not'\nprobabilities: {'01': 0.5, '11': 0.5}\nDeutsch bit (q0) = 1 (متوازنة)\n",
            "readout": "بعد التداخل يُقرأ المدخل 1 (متوازنة). الثابتة → 0 والمتوازنة → 1."
          }
        ]
      },
      {
        "id": "phase",
        "name": "5. أوراكل الطور — Phase oracle (Z)",
        "en": "Phase oracle / interference",
        "file": "query/phase_oracle.py",
        "command": "python -m query.phase_oracle",
        "physics": "إذا f(0)=0 و f(1)=1 فالـ Phase oracle هو بوابة Z. الاحتمالات Probabilities في أساس Z تبقى 50/50 حتى نضع Hadamard ثانية: هذا هو التداخل Interference.",
        "formula": "O_f |x⟩ = (−1)^{f(x)} |x⟩     و     H Z H |0⟩ = |1⟩",
        "params": [
          {
            "name": "لا يوجد اختيار",
            "meaning": "هذا المثال ثابت: الدالة f(x)=x فقط، وتمثَّل ببوابة Z.",
            "allowed": [
              "Z على كيوبت واحد"
            ],
            "note": "حالة واحدة للتوضيح"
          }
        ],
        "snippet": "from query.phase_oracle import interference_circuit\nfrom qiskit.quantum_info import Statevector\n\nqc = interference_circuit()   # H ثم Z ثم H\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
        "expect": "النتيجة |1⟩ بيقين. الطور صار احتمالًا مقاسًا.",
        "full_code": "\"\"\"Q5 — Phase oracle and interference.\n\nBit oracle:   U_f |x,y> = |x, y XOR f(x)>\nPhase oracle: O_f |x>   = (-1)^{f(x)} |x>\n\nFor f(0)=0, f(1)=1 the phase oracle is exactly Z.\nZ|+> = |->, so computational probabilities stay 50/50 until\na second Hadamard turns the phase into a measurable bit.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Operator, Statevector\n\n\ndef phase_oracle_z() -> QuantumCircuit:\n    qc = QuantumCircuit(1, name=\"O_f\")\n    qc.z(0)\n    return qc\n\n\ndef plus_then_phase() -> tuple[Statevector, Statevector]:\n    before = QuantumCircuit(1)\n    before.h(0)\n    after = before.copy()\n    after.z(0)\n    return Statevector.from_instruction(before), Statevector.from_instruction(after)\n\n\ndef interference_circuit() -> QuantumCircuit:\n    qc = QuantumCircuit(1)\n    qc.h(0)\n    qc.z(0)\n    qc.h(0)\n    return qc\n\n\ndef main() -> None:\n    oracle = phase_oracle_z()\n    print(oracle)\n    print(\"Oracle matrix:\")\n    print(Operator(oracle).data)\n\n    before, after = plus_then_phase()\n    print(\"\\nBefore oracle:\", dict(before.probabilities_dict()))\n    print(\"After phase oracle:\", dict(after.probabilities_dict()))\n\n    inter = interference_circuit()\n    print(\"\\nInterference circuit:\")\n    print(inter)\n    print(dict(Statevector.from_instruction(inter).probabilities_dict()))\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "circuit — الدائرة",
            "H then Z then H"
          ]
        ],
        "example_code": "from query.phase_oracle import interference_circuit\nfrom qiskit.quantum_info import Statevector\n\nqc = interference_circuit()\nprint(qc)\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
        "readout": "الطور الخفي صار نتيجة أكيدة |1⟩. هذا هو دور التداخل.",
        "run_output": "given: H then Z then H  (no free parameters)\ncircuit:\n   ┌───┐┌───┐┌───┐\nq: ┤ H ├┤ Z ├┤ H ├\n   └───┘└───┘└───┘\nprobabilities: {'1': 1.0}\nmeaning: hidden phase became a sure |1>\n"
      },
      {
        "id": "parity",
        "name": "6. أوراكل الزوجية — Parity / XOR oracle",
        "en": "Parity oracle",
        "file": "query/parity_oracle.py",
        "command": "python -m query.parity_oracle",
        "physics": "للدالة مدخلان. f هي XOR (parity): الناتج 1 إذا اختلف البتان. المدخلات أربعة Basis states، وتُسأل معًا بالتراكب Superposition.",
        "formula": "f(x0, x1) = x0 ⊕ x1",
        "params": [
          {
            "name": "(x0, x1)",
            "meaning": "زوج المدخل. كل بت 0 أو 1، فالمجموع 4 حالات.",
            "allowed": [
              "(0,0)",
              "(0,1)",
              "(1,0)",
              "(1,1)"
            ],
            "note": "4 احتمالات فقط",
            "table": [
              [
                "x0",
                "x1",
                "f = x0⊕x1"
              ],
              [
                "0",
                "0",
                "0"
              ],
              [
                "0",
                "1",
                "1"
              ],
              [
                "1",
                "0",
                "1"
              ],
              [
                "1",
                "1",
                "0"
              ]
            ]
          }
        ],
        "snippet": "from query.parity_oracle import parity_interference\nfrom qiskit.quantum_info import Statevector\n\nqc = parity_interference()\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
        "expect": "بعد التداخل يظهر المدخل |11⟩. هذه الخاصية العامة (الزوجية) لا تحتاج أربعة أسئلة كلاسيكية.",
        "full_code": "\"\"\"Q6 — Two-input parity oracle.\n\n    f(x0, x1) = x0 XOR x1\n\nq0 = x0, q1 = x1, q2 = target y\n\n    |x0 x1> |y>  ->  |x0 x1> |y XOR x0 XOR x1>\n\nImplemented with two CNOTs. With the target in |-> this marks\nodd-parity inputs with phase -1. Final Hadamards on the input\nregister convert that phase pattern into a definite basis state.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n\n\ndef parity_oracle() -> QuantumCircuit:\n    qc = QuantumCircuit(3, name=\"U_parity\")\n    qc.cx(0, 2)\n    qc.cx(1, 2)\n    return qc\n\n\ndef parity_query() -> QuantumCircuit:\n    qc = QuantumCircuit(3)\n    qc.h([0, 1])\n    qc.append(parity_oracle().to_gate(label=\"U_f\"), [0, 1, 2])\n    return qc\n\n\ndef parity_kickback() -> QuantumCircuit:\n    qc = QuantumCircuit(3)\n    qc.h([0, 1])\n    qc.x(2)\n    qc.h(2)\n    qc.append(parity_oracle().to_gate(label=\"U_f\"), [0, 1, 2])\n    return qc\n\n\ndef parity_interference() -> QuantumCircuit:\n    qc = parity_kickback()\n    qc.h([0, 1])\n    return qc\n\n\ndef main() -> None:\n    print(parity_oracle())\n\n    query = parity_query()\n    print(\"\\nSuperposition query:\")\n    print(query)\n    print(\"Probabilities:\", dict(Statevector.from_instruction(query).probabilities_dict()))\n\n    kick = parity_kickback()\n    print(\"\\nKickback state:\")\n    print(Statevector.from_instruction(kick))\n\n    inter = parity_interference()\n    print(\"\\nAfter interference:\")\n    print(inter)\n    print(\"Probabilities:\", dict(Statevector.from_instruction(inter).probabilities_dict()))\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "f",
            "x0 XOR x1"
          ],
          [
            "inputs — المدخلات",
            "00, 01, 10, 11 together"
          ]
        ],
        "example_code": "from query.parity_oracle import parity_interference\nfrom qiskit.quantum_info import Statevector\n\nqc = parity_interference()\nprint(qc)\nprint(dict(Statevector.from_instruction(qc).probabilities_dict()))",
        "readout": "الأربع مدخلات تداخلت إلى |11⟩ على سجل المدخل. الخاصية العامة ظهرت من استعلام واحد.",
        "run_output": "given: f(x0,x1)=x0 XOR x1   (all 4 inputs queried in superposition)\ncircuit:\n     ┌───┐     ┌──────┐┌───┐\nq_0: ┤ H ├─────┤0     ├┤ H ├\n     ├───┤     │      │├───┤\nq_1: ┤ H ├─────┤1 U_f ├┤ H ├\n     ├───┤┌───┐│      │└───┘\nq_2: ┤ X ├┤ H ├┤2     ├─────\n     └───┘└───┘└──────┘     \nprobabilities: {'011': 0.5, '111': 0.5}\nmeaning: input register interferes to |11>\n",
        "case_groups": [
          {
            "name": "pair",
            "title": "زوج المدخل — input pair (x0, x1)"
          }
        ],
        "cases": [
          {
            "id": "00",
            "label": "(0,0)",
            "given": [
              [
                "x0",
                "0"
              ],
              [
                "x1",
                "0"
              ]
            ],
            "example_code": "# أساس واحد: x0=0, x1=0\n# f = 0",
            "run_output": "given: x0=0, x1=0\nXOR = 0\nprobabilities: {'000': 1.0}\n",
            "readout": "الناتج 0 لأن البتين متساويان."
          },
          {
            "id": "01",
            "label": "(0,1)",
            "given": [
              [
                "x0",
                "0"
              ],
              [
                "x1",
                "1"
              ]
            ],
            "example_code": "# أساس واحد: x0=0, x1=1\n# f = 1",
            "run_output": "given: x0=0, x1=1\nXOR = 1\nprobabilities: {'110': 1.0}\n",
            "readout": "الناتج 1 لأن البتين مختلفان."
          },
          {
            "id": "10",
            "label": "(1,0)",
            "given": [
              [
                "x0",
                "1"
              ],
              [
                "x1",
                "0"
              ]
            ],
            "example_code": "# أساس واحد: x0=1, x1=0\n# f = 1",
            "run_output": "given: x0=1, x1=0\nXOR = 1\nprobabilities: {'101': 1.0}\n",
            "readout": "الناتج 1 لأن البتين مختلفان."
          },
          {
            "id": "11",
            "label": "(1,1)",
            "given": [
              [
                "x0",
                "1"
              ],
              [
                "x1",
                "1"
              ]
            ],
            "example_code": "# أساس واحد: x0=1, x1=1\n# f = 0",
            "run_output": "given: x0=1, x1=1\nXOR = 0\nprobabilities: {'011': 1.0}\n",
            "readout": "الناتج 0 لأن البتين متساويان."
          }
        ]
      },
      {
        "id": "mark",
        "name": "7. تعليم حالة — Marked-state oracle",
        "en": "Phase marking (Grover-style)",
        "file": "query/marked_state.py",
        "command": "python -m query.marked_state",
        "physics": "نختار حالة أساس Basis state واحدة ونضرب سعتها Amplitude في −1 (Marking). الاحتمالات لا تتغير. هذا نوع أوراكل البحث في خوارزمية Grover.",
        "formula": "O|x⟩ = −|x⟩  إذا كان x هو الهدف، وإلا |x⟩ كما هو",
        "params": [
          {
            "name": "target",
            "meaning": "الحالة المراد تعليمها Marked state، مكتوبة بترتيب Qiskit: q1 ثم q0.",
            "allowed": [
              "00",
              "01",
              "10",
              "11"
            ],
            "note": "4 احتمالات فقط لكيوبتين"
          }
        ],
        "snippet": "from query.marked_state import mark_two_qubit_state, mark_demo\n\n# target ∈ {00, 01, 10, 11}   — أربع حالات أساس لا غير\nbefore, after = mark_demo(\"10\")\nprint(after)",
        "expect": "الاحتمالات تبقى 1/4 لكل حالة. سعة الحالة المختارة فقط تصبح سالبة.",
        "full_code": "\"\"\"Q7 — Marked-state phase oracle.\n\nSearch-style oracles multiply one basis amplitude by -1.\nFor two qubits, CZ marks |11>.\n\nTo mark any displayed string q1q0 in {00,01,10,11}:\nflip zeros to ones, apply CZ, then uncompute the X gates.\n\nMarking alone does not change probabilities. Grover later\nadds amplitude amplification.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Operator, Statevector\n\nVALID_TARGETS = {\"00\", \"01\", \"10\", \"11\"}\n\n\ndef marked_oracle_11() -> QuantumCircuit:\n    qc = QuantumCircuit(2, name=\"O_mark_11\")\n    qc.cz(0, 1)\n    return qc\n\n\ndef mark_two_qubit_state(target: str) -> QuantumCircuit:\n    \"\"\"Phase-mark one 2-qubit basis state.\n\n    `target` is written in displayed Qiskit order q1q0.\n    Example: target='10' means q1=1, q0=0.\n    \"\"\"\n    if target not in VALID_TARGETS:\n        raise ValueError(\"target must be one of 00, 01, 10, 11\")\n\n    qc = QuantumCircuit(2, name=f\"O_{target}\")\n    q1 = int(target[0])\n    q0 = int(target[1])\n\n    if q0 == 0:\n        qc.x(0)\n    if q1 == 0:\n        qc.x(1)\n\n    qc.cz(0, 1)\n\n    if q0 == 0:\n        qc.x(0)\n    if q1 == 0:\n        qc.x(1)\n\n    return qc\n\n\ndef mark_demo(target: str | None = None) -> tuple[Statevector, Statevector]:\n    qc = QuantumCircuit(2)\n    qc.h([0, 1])\n    before = Statevector.from_instruction(qc)\n    if target is None:\n        qc.cz(0, 1)\n    else:\n        qc.append(mark_two_qubit_state(target).to_gate(label=f\"O_{target}\"), [0, 1])\n    after = Statevector.from_instruction(qc)\n    return before, after\n\n\ndef main() -> None:\n    oracle = marked_oracle_11()\n    print(oracle)\n    print(\"Matrix:\")\n    print(Operator(oracle).data)\n\n    before, after = mark_demo()\n    print(\"\\nBefore marking:\", before)\n    print(\"After marking |11>:\", after)\n    print(\"Probabilities:\", dict(after.probabilities_dict()))\n\n    for target in (\"00\", \"01\", \"10\", \"11\"):\n        print(f\"\\nTarget = {target}\")\n        print(mark_two_qubit_state(target))\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "target",
            "10"
          ]
        ],
        "example_code": "from query.marked_state import mark_demo\n\ntarget = \"10\"              # واحد من: 00 | 01 | 10 | 11\nbefore, after = mark_demo(target)\nprint(\"before:\", before)\nprint(\"after :\", after)\nprint(dict(after.probabilities_dict()))",
        "readout": "سعة 10 فقط سالبة. الاحتمالات ما زالت 1/4 — التعليم طور لا قياس.",
        "run_output": "given: target = '10'   (one of 00,01,10,11)\nbefore: Statevector([0.5+0.j, 0.5+0.j, 0.5+0.j, 0.5+0.j],\n            dims=(2, 2))\nafter : Statevector([ 0.5+0.j,  0.5+0.j, -0.5+0.j,  0.5+0.j],\n            dims=(2, 2))\nprobabilities after: {'00': 0.25, '01': 0.25, '10': 0.25, '11': 0.25}\nmeaning: only the '10' amplitude changed sign; probabilities still 1/4\n",
        "case_groups": [
          {
            "name": "target",
            "title": "الحالة المعلَّمة — marked target (4 only)"
          }
        ],
        "cases": [
          {
            "id": "00",
            "label": "00",
            "given": [
              [
                "target",
                "00"
              ]
            ],
            "example_code": "from query.marked_state import mark_demo\n\nbefore, after = mark_demo(\"00\")\nprint(after)",
            "run_output": "given: target='00'\nprobabilities: {'00': 0.25, '01': 0.25, '10': 0.25, '11': 0.25}\nsigns: 00: −, 01: +, 10: +, 11: +\n",
            "readout": "الحالة 00 فقط إشارتها −. الاحتمالات ما زالت 1/4."
          },
          {
            "id": "01",
            "label": "01",
            "given": [
              [
                "target",
                "01"
              ]
            ],
            "example_code": "from query.marked_state import mark_demo\n\nbefore, after = mark_demo(\"01\")\nprint(after)",
            "run_output": "given: target='01'\nprobabilities: {'00': 0.25, '01': 0.25, '10': 0.25, '11': 0.25}\nsigns: 00: +, 01: −, 10: +, 11: +\n",
            "readout": "الحالة 01 فقط إشارتها −. الاحتمالات ما زالت 1/4."
          },
          {
            "id": "10",
            "label": "10",
            "given": [
              [
                "target",
                "10"
              ]
            ],
            "example_code": "from query.marked_state import mark_demo\n\nbefore, after = mark_demo(\"10\")\nprint(after)",
            "run_output": "given: target='10'\nprobabilities: {'00': 0.25, '01': 0.25, '10': 0.25, '11': 0.25}\nsigns: 00: +, 01: +, 10: −, 11: +\n",
            "readout": "الحالة 10 فقط إشارتها −. الاحتمالات ما زالت 1/4."
          },
          {
            "id": "11",
            "label": "11",
            "given": [
              [
                "target",
                "11"
              ]
            ],
            "example_code": "from query.marked_state import mark_demo\n\nbefore, after = mark_demo(\"11\")\nprint(after)",
            "run_output": "given: target='11'\nprobabilities: {'00': 0.25, '01': 0.25, '10': 0.25, '11': 0.25}\nsigns: 00: +, 01: +, 10: +, 11: −\n",
            "readout": "الحالة 11 فقط إشارتها −. الاحتمالات ما زالت 1/4."
          }
        ]
      },
      {
        "id": "and",
        "name": "8. أوراكل AND — Toffoli",
        "en": "AND oracle / Toffoli (CCX)",
        "file": "query/and_oracle.py",
        "command": "python -m query.and_oracle",
        "physics": "f = 1 فقط عندما يكون المدخلان 1 معًا (AND). تُنفَّذ ببوابة Toffoli = CCX. مرة أخرى: 4 مدخلات Basis inputs فقط.",
        "formula": "f(x0, x1) = x0 · x1",
        "params": [
          {
            "name": "(x0, x1)",
            "meaning": "زوج المدخل.",
            "allowed": [
              "(0,0)",
              "(0,1)",
              "(1,0)",
              "(1,1)"
            ],
            "note": "4 احتمالات فقط",
            "table": [
              [
                "x0",
                "x1",
                "f = AND"
              ],
              [
                "0",
                "0",
                "0"
              ],
              [
                "0",
                "1",
                "0"
              ],
              [
                "1",
                "0",
                "0"
              ],
              [
                "1",
                "1",
                "1"
              ]
            ]
          }
        ],
        "snippet": "from query.and_oracle import and_oracle, evaluate_two_input_boolean_oracle\n\n# يطبع الناتج لكل زوج (x0,x1) ∈ {0,1}×{0,1}\nprint(evaluate_two_input_boolean_oracle(and_oracle()))",
        "expect": "الهدف ينقلب فقط عند (1,1). بقية الأزواج تترك الهدف 0.",
        "full_code": "\"\"\"Q8 — AND oracle.\n\n    f(x0, x1) = x0 x1\n\nA Toffoli implements the reversible encoding:\n\n    |x0, x1, y>  ->  |x0, x1, y XOR (x0 x1)>\n\nOnly the input |11> flips the target when y starts in |0>.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n\n\ndef and_oracle() -> QuantumCircuit:\n    qc = QuantumCircuit(3, name=\"U_AND\")\n    qc.ccx(0, 1, 2)\n    return qc\n\n\ndef and_query() -> QuantumCircuit:\n    qc = QuantumCircuit(3)\n    qc.h([0, 1])\n    qc.append(and_oracle().to_gate(label=\"U_AND\"), [0, 1, 2])\n    return qc\n\n\ndef evaluate_two_input_boolean_oracle(oracle_circuit: QuantumCircuit) -> dict[tuple[int, int], dict]:\n    \"\"\"Evaluate all four computational inputs with y initialized to 0.\"\"\"\n    gate = oracle_circuit.to_gate(label=\"U_f\")\n    table: dict[tuple[int, int], dict] = {}\n\n    for x0 in (0, 1):\n        for x1 in (0, 1):\n            qc = QuantumCircuit(3)\n            if x0:\n                qc.x(0)\n            if x1:\n                qc.x(1)\n            qc.append(gate, [0, 1, 2])\n            table[(x0, x1)] = dict(Statevector.from_instruction(qc).probabilities_dict())\n\n    return table\n\n\ndef main() -> None:\n    print(and_oracle())\n    query = and_query()\n    print(query)\n    print(\"Superposition probabilities:\", dict(Statevector.from_instruction(query).probabilities_dict()))\n    print(\"\\nTesting AND:\")\n    for (x0, x1), probs in evaluate_two_input_boolean_oracle(and_oracle()).items():\n        print(f\"x0={x0}, x1={x1} -> {probs}\")\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "(x0,x1)",
            "كل الأزواج الأربعة"
          ]
        ],
        "example_code": "from query.and_oracle import and_oracle, evaluate_two_input_boolean_oracle\n\ntable = evaluate_two_input_boolean_oracle(and_oracle())\nfor (x0, x1), probs in table.items():\n    print(x0, x1, probs)",
        "readout": "الهدف ينقلب فقط عند (1,1). هذا جدول AND كامل بأربع تجارب أساس.",
        "run_output": "given: all 4 pairs (x0,x1) in {0,1}x{0,1}\n  x0=0, x1=0 -> {'000': 1.0}\n  x0=0, x1=1 -> {'010': 1.0}\n  x0=1, x1=0 -> {'001': 1.0}\n  x0=1, x1=1 -> {'111': 1.0}\nmeaning: target flips only for (1,1)\n",
        "case_groups": [
          {
            "name": "pair",
            "title": "زوج المدخل — input pair (x0, x1)"
          }
        ],
        "cases": [
          {
            "id": "00",
            "label": "(0,0)",
            "given": [
              [
                "x0",
                "0"
              ],
              [
                "x1",
                "0"
              ]
            ],
            "example_code": "from query.and_oracle import and_oracle, evaluate_two_input_boolean_oracle\nprint(evaluate_two_input_boolean_oracle(and_oracle())[(0, 0)])",
            "run_output": "given: x0=0, x1=0\nAND = 0\nprobabilities: {'000': 1.0}\n",
            "readout": "الهدف بقي 0."
          },
          {
            "id": "01",
            "label": "(0,1)",
            "given": [
              [
                "x0",
                "0"
              ],
              [
                "x1",
                "1"
              ]
            ],
            "example_code": "from query.and_oracle import and_oracle, evaluate_two_input_boolean_oracle\nprint(evaluate_two_input_boolean_oracle(and_oracle())[(0, 1)])",
            "run_output": "given: x0=0, x1=1\nAND = 0\nprobabilities: {'010': 1.0}\n",
            "readout": "الهدف بقي 0."
          },
          {
            "id": "10",
            "label": "(1,0)",
            "given": [
              [
                "x0",
                "1"
              ],
              [
                "x1",
                "0"
              ]
            ],
            "example_code": "from query.and_oracle import and_oracle, evaluate_two_input_boolean_oracle\nprint(evaluate_two_input_boolean_oracle(and_oracle())[(1, 0)])",
            "run_output": "given: x0=1, x1=0\nAND = 0\nprobabilities: {'001': 1.0}\n",
            "readout": "الهدف بقي 0."
          },
          {
            "id": "11",
            "label": "(1,1)",
            "given": [
              [
                "x0",
                "1"
              ],
              [
                "x1",
                "1"
              ]
            ],
            "example_code": "from query.and_oracle import and_oracle, evaluate_two_input_boolean_oracle\nprint(evaluate_two_input_boolean_oracle(and_oracle())[(1, 1)])",
            "run_output": "given: x0=1, x1=1\nAND = 1\nprobabilities: {'111': 1.0}\n",
            "readout": "الهدف انقلب."
          }
        ]
      },
      {
        "id": "complexity",
        "name": "9. تعقيد الاستعلام — Query complexity",
        "en": "Query complexity vs gate complexity",
        "file": "query/complexity.py",
        "command": "python -m query.complexity",
        "physics": "Query complexity تعدّ كم مرة لمسنا الصندوق الأسود Black box U_f. عدد البوابات Gates داخل الصندوق مسألة أخرى: Gate complexity (عتاد Hardware).",
        "formula": "Q(A) = عدد مرات استدعاء U_f",
        "params": [
          {
            "name": "n_queries",
            "meaning": "كم مرة نضع كتلة الأوراكل Oracle block في الدائرة Circuit.",
            "allowed": [
              "1",
              "2",
              "3",
              "... عدد صحيح موجب"
            ],
            "note": "المثال الافتراضي = 3"
          }
        ],
        "snippet": "from query.complexity import query_block_circuit, count_oracle_blocks\n\n# n_queries عدد صحيح ≥ 1   (المثال: 3)\nqc = query_block_circuit(n_queries=3)\nprint(\"عدد الاستعلامات =\", count_oracle_blocks(qc))",
        "expect": "قبل تفكيك الدائرة يظهر 3 صناديق اسمها U_f. بعد التفكيك تظهر عدة CNOT.",
        "full_code": "\"\"\"Q9 — Query complexity vs gate complexity, unitarity, inverse.\n\nOne custom gate labeled U_f counts as one query, even if it\ndecomposes into several CNOTs.\n\nFor the standard XOR oracle, U_f is unitary and U_f^2 = I.\n\"\"\"\n\nfrom __future__ import annotations\n\nimport numpy as np\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Operator, Statevector\n\nfrom query.one_bit_oracles import make_oracle_1bit\nfrom query.parity_oracle import parity_oracle\n\n\ndef query_block_circuit(n_queries: int = 3) -> QuantumCircuit:\n    oracle_circuit = parity_oracle()\n    oracle_circuit.name = \"U_f\"\n    oracle_gate = oracle_circuit.to_gate(label=\"U_f\")\n\n    algorithm = QuantumCircuit(3)\n    algorithm.h([0, 1])\n    for i in range(n_queries):\n        algorithm.append(oracle_gate, [0, 1, 2])\n        if i == 0:\n            algorithm.x(0)\n        elif i == 1:\n            algorithm.h(1)\n    return algorithm\n\n\ndef count_oracle_blocks(circuit: QuantumCircuit) -> int:\n    ops = circuit.count_ops()\n    return int(ops.get(\"U_f\", 0) or ops.get(\"c_U_f\", 0))\n\n\ndef unitary_check(kind: str = \"identity\") -> tuple[np.ndarray, np.ndarray]:\n    U = Operator(make_oracle_1bit(kind)).data\n    dagger_U = U.conj().T @ U\n    return U, np.round(dagger_U, 10)\n\n\ndef oracle_is_self_inverse(kind: str = \"not\") -> bool:\n    qc = QuantumCircuit(2)\n    oracle = make_oracle_1bit(kind).to_gate(label=\"U_f\")\n    qc.h(0)\n    before = Statevector.from_instruction(qc)\n    qc.append(oracle, [0, 1])\n    qc.append(oracle, [0, 1])\n    after = Statevector.from_instruction(qc)\n    return before.equiv(after)\n\n\ndef main() -> None:\n    algorithm = query_block_circuit(3)\n    print(algorithm)\n    print(\"Operation counts:\", dict(algorithm.count_ops()))\n    print(\"Query count Q(A) =\", count_oracle_blocks(algorithm))\n    print(\"\\nDecomposed circuit:\")\n    print(algorithm.decompose())\n    print(\"Decomposed operation counts:\", dict(algorithm.decompose().count_ops()))\n\n    U, dagger_U = unitary_check()\n    print(\"\\nIdentity-oracle matrix:\")\n    print(U)\n    print(\"U†U:\")\n    print(dagger_U)\n    print(\"Self-inverse (not oracle applied twice):\", oracle_is_self_inverse(\"not\"))\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "n_queries",
            "3"
          ]
        ],
        "example_code": "from query.complexity import query_block_circuit, count_oracle_blocks\n\nn_queries = 3              # عدد صحيح ≥ 1\nqc = query_block_circuit(n_queries)\nprint(qc)\nprint(\"Q(A) =\", count_oracle_blocks(qc))",
        "readout": "ثلاثة صناديق U_f = ثلاثة استعلامات، حتى لو داخل كل صندوق أكثر من بوابة.",
        "run_output": "given: n_queries = 3\n     ┌───┐┌──────┐┌───┐┌──────┐     ┌──────┐\nq_0: ┤ H ├┤0     ├┤ X ├┤0     ├─────┤0     ├\n     ├───┤│      │└───┘│      │┌───┐│      │\nq_1: ┤ H ├┤1 U_f ├─────┤1 U_f ├┤ H ├┤1 U_f ├\n     └───┘│      │     │      │└───┘│      │\nq_2: ─────┤2     ├─────┤2     ├─────┤2     ├\n          └──────┘     └──────┘     └──────┘\nquery count Q(A) = 3\nmeaning: three black-box calls, regardless of gates inside U_f\n",
        "case_groups": [
          {
            "name": "n",
            "title": "عدد الاستعلامات — n queries"
          }
        ],
        "cases": [
          {
            "id": "1",
            "label": "n=1",
            "given": [
              [
                "n_queries",
                "1"
              ]
            ],
            "example_code": "from query.complexity import query_block_circuit, count_oracle_blocks\n\nprint(count_oracle_blocks(query_block_circuit(1)))",
            "run_output": "given: n_queries=1\nQ(A) = 1\n",
            "readout": "عدد صناديق U_f = 1."
          },
          {
            "id": "2",
            "label": "n=2",
            "given": [
              [
                "n_queries",
                "2"
              ]
            ],
            "example_code": "from query.complexity import query_block_circuit, count_oracle_blocks\n\nprint(count_oracle_blocks(query_block_circuit(2)))",
            "run_output": "given: n_queries=2\nQ(A) = 2\n",
            "readout": "عدد صناديق U_f = 2."
          },
          {
            "id": "3",
            "label": "n=3",
            "given": [
              [
                "n_queries",
                "3"
              ]
            ],
            "example_code": "from query.complexity import query_block_circuit, count_oracle_blocks\n\nprint(count_oracle_blocks(query_block_circuit(3)))",
            "run_output": "given: n_queries=3\nQ(A) = 3\n",
            "readout": "عدد صناديق U_f = 3."
          },
          {
            "id": "4",
            "label": "n=4",
            "given": [
              [
                "n_queries",
                "4"
              ]
            ],
            "example_code": "from query.complexity import query_block_circuit, count_oracle_blocks\n\nprint(count_oracle_blocks(query_block_circuit(4)))",
            "run_output": "given: n_queries=4\nQ(A) = 4\n",
            "readout": "عدد صناديق U_f = 4."
          },
          {
            "id": "5",
            "label": "n=5",
            "given": [
              [
                "n_queries",
                "5"
              ]
            ],
            "example_code": "from query.complexity import query_block_circuit, count_oracle_blocks\n\nprint(count_oracle_blocks(query_block_circuit(5)))",
            "run_output": "given: n_queries=5\nQ(A) = 5\n",
            "readout": "عدد صناديق U_f = 5."
          }
        ]
      },
      {
        "id": "query_master",
        "name": "10. الاختبار الشامل — Integration test",
        "en": "End-to-end / master integration test",
        "file": "tests/test_all_modules.py",
        "command": "pytest tests/test_all_modules.py -v",
        "physics": "يشغّل كل الوحدات Modules بالترتيب (Oracle، Superposition، Phase، Teleportation) ويتأكد أنها تتوافق. لا تحتاج تدخل.",
        "formula": "كل الوحدات ⟶ دائرة واحدة ⟶ محاكاة ⟶ رسوم",
        "params": [
          {
            "name": "لا توجد معطيات",
            "meaning": "ملف جاهز. لا تغيّر قيمًا.",
            "allowed": [
              "تشغيل الأمر كما هو"
            ],
            "note": "بدون اختيارات"
          }
        ],
        "snippet": "# من مجلد quantum_reference:\n# pytest tests/test_all_modules.py -v",
        "expect": "نجاح الاختبارات، وصور في مجلد figures.",
        "full_code": "\"\"\"Master integration test.\n\nAssembles every isolated template into one end-to-end pipeline:\n\n    query oracles → superposition → kickback → interference\n    → parity / mark / AND\n    → teleportation (fidelity + shots + histogram)\n\nRun:\n    pytest tests/test_all_modules.py -v\n    python tests/test_all_modules.py\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom math import pi\nfrom pathlib import Path\n\nimport matplotlib\n\nmatplotlib.use(\"Agg\")\n\nfrom matplotlib import pyplot as plt\nfrom qiskit.quantum_info import Statevector\nfrom qiskit.visualization import plot_histogram\n\nfrom common.env import require_qiskit\nfrom query.and_oracle import and_oracle, evaluate_two_input_boolean_oracle\nfrom query.basis_query import basis_query\nfrom query.complexity import count_oracle_blocks, oracle_is_self_inverse, query_block_circuit\nfrom query.marked_state import mark_demo\nfrom query.one_bit_oracles import make_oracle_1bit\nfrom query.parity_oracle import parity_interference, parity_oracle\nfrom query.phase_kickback import kickback_readout\nfrom query.phase_oracle import interference_circuit\nfrom query.superposition_query import superposition_counts, superposition_query\nfrom teleport.bell_pair import bell_pair\nfrom teleport.no_correction import fidelity_without_corrections\nfrom teleport.protocol import build_dynamic_teleport\nfrom teleport.verify_fidelity import teleport_and_verify\nfrom teleport.verify_shots import dynamic_success_rate, run_dynamic\nfrom tests.helpers import count_dict, prob_dict\n\nFIGURES = Path(__file__).resolve().parents[1] / \"figures\"\nFIGURES.mkdir(exist_ok=True)\n\n\ndef _save_circuit(circuit, name: str) -> None:\n    figure = circuit.draw(\"mpl\", fold=-1)\n    figure.savefig(FIGURES / name, bbox_inches=\"tight\")\n    plt.close(figure)\n\n\ndef test_all_modules_end_to_end_pipeline():\n    require_qiskit()\n\n    oracle = make_oracle_1bit(\"identity\")\n    assert oracle.count_ops() == {\"cx\": 1}\n\n    _, basis1 = basis_query(\"identity\", 1)\n    assert prob_dict(basis1)[\"11\"] == 1.0\n\n    super_qc = superposition_query(\"identity\")\n    super_probs = prob_dict(Statevector.from_instruction(super_qc))\n    assert set(super_probs) == {\"00\", \"11\"}\n\n    super_counts = count_dict(superposition_counts(\"identity\", shots=1000))\n    plot_histogram(super_counts).savefig(FIGURES / \"query_superposition_histogram.png\", bbox_inches=\"tight\")\n    plt.close()\n\n    readout = kickback_readout(\"identity\")\n    readout_probs = prob_dict(Statevector.from_instruction(readout))\n    assert all(label[-1] == \"1\" for label in readout_probs)\n    _save_circuit(readout, \"query_kickback_readout.png\")\n\n    z_probs = prob_dict(Statevector.from_instruction(interference_circuit()))\n    assert abs(z_probs.get(\"1\", 0.0) - 1.0) < 1e-10\n\n    parity = parity_oracle()\n    assert parity.count_ops() == {\"cx\": 2}\n    parity_probs = prob_dict(Statevector.from_instruction(parity_interference()))\n    assert all(label[-2:] == \"11\" for label in parity_probs)\n\n    _, marked = mark_demo(\"11\")\n    mark_probs = prob_dict(marked)\n    assert all(abs(p - 0.25) < 1e-10 for p in mark_probs.values())\n    assert marked.data[3].real < 0\n\n    and_table = evaluate_two_input_boolean_oracle(and_oracle())\n    assert and_table[(1, 1)][\"111\"] == 1.0\n\n    blocks = query_block_circuit(3)\n    assert count_oracle_blocks(blocks) == 3\n    assert oracle_is_self_inverse(\"identity\")\n\n    _, bell_state = bell_pair()\n    bell_probs = prob_dict(bell_state)\n    assert set(bell_probs) == {\"00\", \"11\"}\n\n    theta, phi = pi / 3, pi / 4\n    fidelity, _, _ = teleport_and_verify(theta, phi)\n    assert abs(fidelity - 1.0) < 1e-10\n\n    bad, _ = fidelity_without_corrections(theta, phi)\n    assert bad < 0.9\n\n    dynamic = build_dynamic_teleport(theta, phi)\n    _save_circuit(dynamic, \"teleport_dynamic_circuit.png\")\n\n    counts = count_dict(run_dynamic(theta, phi, shots=500))\n    successful, total, rate = dynamic_success_rate(counts)\n    assert total == 500\n    assert successful == 500\n    assert rate == 1.0\n    plot_histogram(counts).savefig(FIGURES / \"teleport_shot_histogram.png\", bbox_inches=\"tight\")\n    plt.close()\n\n    print(\"Pipeline OK\")\n    print(\"  kickback input bit is 1\")\n    print(\"  parity interference -> |11>\")\n    print(\"  teleport fidelity =\", fidelity)\n    print(\"  teleport shot success =\", rate)\n    print(\"  figures ->\", FIGURES)\n\n\nif __name__ == \"__main__\":\n    test_all_modules_end_to_end_pipeline()\n",
        "given": [
          [
            "الأمر",
            "pytest tests/test_all_modules.py -v"
          ]
        ],
        "example_code": "# شغّل من مجلد quantum_reference\n# pytest tests/test_all_modules.py -v",
        "readout": "43 اختبارًا ناجحًا تعني أن كل القوالب ما زالت تتوافق.",
        "run_output": "given: no parameters — full pipeline\nsimulator: pytest tests/test_all_modules.py -v\nresult: 43 passed\nmeaning: every module connected without breaking changes\n"
      }
    ]
  },
  "teleportation": {
    "title": "بروتوكول النقل الآني — Quantum teleportation",
    "description": "نقل الحالة |ψ⟩ من Alice إلى Bob عبر Entanglement + Classical bits + Correction. اضغط الحالة لترى الناتج.",
    "modules": [
      {
        "id": "psi",
        "name": "1. تحضير الحالة — State preparation",
        "en": "State preparation |ψ⟩",
        "file": "teleport/state_prep.py",
        "command": "python -m teleport.state_prep",
        "physics": "أي حالة نقية Pure state لكيوبت Qubit واحد تُحدَّد بزاويتين على كرة Bloch sphere. النقل الآني Quantum teleportation يجب أن يحفظ السعات Amplitudes والطور Phase.",
        "formula": "|ψ⟩ = cos(θ/2)|0⟩ + e^{iφ} sin(θ/2)|1⟩",
        "params": [
          {
            "name": "theta (θ)",
            "meaning": "زاوية القطب Polar angle. تتحكم باحتمال |0⟩ مقابل |1⟩.",
            "allowed": [
              "أي عدد حقيقي بين 0 و π"
            ],
            "note": "المجال: 0 ≤ θ ≤ π"
          },
          {
            "name": "phi (φ)",
            "meaning": "الطور النسبي Relative phase حول خط الاستواء.",
            "allowed": [
              "أي عدد حقيقي بين 0 و 2π"
            ],
            "note": "المجال: 0 ≤ φ < 2π"
          }
        ],
        "snippet": "from math import pi\nfrom teleport.state_prep import prepare_psi\n\n# θ بين 0 و π     مثال شائع: pi/3\n# φ بين 0 و 2π    مثال شائع: pi/4\ncircuit, psi = prepare_psi(theta=pi/3, phi=pi/4)\nprint(psi)",
        "expect": "عند θ=π/3 يكون P(0)=cos²(π/6)=3/4 و P(1)=1/4. الطور لا يظهر في هذا القياس.",
        "full_code": "\"\"\"T1 — Prepare the unknown state |ψ>.\n\n    |ψ> = cos(θ/2)|0> + e^{iφ} sin(θ/2)|1>\n\nImplemented as RY(θ) then RZ(φ). Teleportation must preserve\nboth amplitudes and relative phase.\n\nDirect measurement cannot tell |+> from |->; a Hadamard can.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom math import pi\n\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n\n\ndef prepare_psi(theta: float, phi: float) -> tuple[QuantumCircuit, Statevector]:\n    qc = QuantumCircuit(1, name=\"psi\")\n    qc.ry(theta, 0)\n    qc.rz(phi, 0)\n    return qc, Statevector.from_instruction(qc)\n\n\ndef phase_demo() -> tuple[dict, dict]:\n    \"\"\"H-H on |+> vs H-Z-H on |->.\"\"\"\n    plus = QuantumCircuit(1)\n    plus.h(0)\n    plus.h(0)\n\n    minus = QuantumCircuit(1)\n    minus.h(0)\n    minus.z(0)\n    minus.h(0)\n\n    plus_probs = dict(Statevector.from_instruction(plus).probabilities_dict())\n    minus_probs = dict(Statevector.from_instruction(minus).probabilities_dict())\n    return plus_probs, minus_probs\n\n\ndef main() -> None:\n    theta = pi / 3\n    phi = pi / 4\n    source, psi = prepare_psi(theta, phi)\n    print(source)\n    print(\"Statevector:\", psi)\n    print(\"Probabilities:\", dict(psi.probabilities_dict()))\n\n    plus_probs, minus_probs = phase_demo()\n    print(\"H-H:\", plus_probs)\n    print(\"H-Z-H:\", minus_probs)\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "theta",
            "π/3"
          ],
          [
            "phi",
            "π/4"
          ]
        ],
        "example_code": "from math import pi\nfrom teleport.state_prep import prepare_psi\n\ntheta = pi/3               # بين 0 و π\nphi = pi/4                 # بين 0 و 2π\ncircuit, psi = prepare_psi(theta, phi)\nprint(circuit)\nprint(psi)\nprint(dict(psi.probabilities_dict()))",
        "readout": "P(0)=0.75 و P(1)=0.25. الطور φ لا يظهر في قياس Z.",
        "run_output": "given: theta = pi/3 , phi = pi/4\n   ┌─────────┐┌─────────┐\nq: ┤ Ry(π/3) ├┤ Rz(π/4) ├\n   └─────────┘└─────────┘\nstate: Statevector([0.80010315-0.33141357j, 0.46193977+0.19134172j],\n            dims=(2,))\nprobabilities: {'0': 0.75, '1': 0.25}\nmeaning: P(0)=0.75 , P(1)=0.25 ; phi is not visible in Z-measurement\n",
        "case_groups": [
          {
            "name": "state",
            "title": "اختر الحالة — state |ψ⟩"
          }
        ],
        "cases": [
          {
            "id": "0",
            "label": "|0⟩",
            "given": [
              [
                "theta",
                "0"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.state_prep import prepare_psi\n\n_, psi = prepare_psi(0, 0)\nprint(dict(psi.probabilities_dict()))",
            "run_output": "given: |0⟩\nθ=0, φ=0\nprobabilities: {'0': 1.0}\n",
            "readout": "احتمالات القياس في أساس Z لهذه الحالة |0⟩."
          },
          {
            "id": "1",
            "label": "|1⟩",
            "given": [
              [
                "theta",
                "pi"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.state_prep import prepare_psi\n\n_, psi = prepare_psi(pi, 0)\nprint(dict(psi.probabilities_dict()))",
            "run_output": "given: |1⟩\nθ=pi, φ=0\nprobabilities: {'1': 1.0}\n",
            "readout": "احتمالات القياس في أساس Z لهذه الحالة |1⟩."
          },
          {
            "id": "plus",
            "label": "|+⟩",
            "given": [
              [
                "theta",
                "pi/2"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.state_prep import prepare_psi\n\n_, psi = prepare_psi(pi/2, 0)\nprint(dict(psi.probabilities_dict()))",
            "run_output": "given: |+⟩\nθ=pi/2, φ=0\nprobabilities: {'0': 0.5, '1': 0.5}\n",
            "readout": "احتمالات القياس في أساس Z لهذه الحالة |+⟩."
          },
          {
            "id": "minus",
            "label": "|−⟩",
            "given": [
              [
                "theta",
                "pi/2"
              ],
              [
                "phi",
                "pi"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.state_prep import prepare_psi\n\n_, psi = prepare_psi(pi/2, pi)\nprint(dict(psi.probabilities_dict()))",
            "run_output": "given: |−⟩\nθ=pi/2, φ=pi\nprobabilities: {'0': 0.5, '1': 0.5}\n",
            "readout": "احتمالات القياس في أساس Z لهذه الحالة |−⟩."
          },
          {
            "id": "ex",
            "label": "مثال π/3, π/4",
            "given": [
              [
                "theta",
                "pi/3"
              ],
              [
                "phi",
                "pi/4"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.state_prep import prepare_psi\n\n_, psi = prepare_psi(pi/3, pi/4)\nprint(dict(psi.probabilities_dict()))",
            "run_output": "given: مثال π/3, π/4\nθ=pi/3, φ=pi/4\nprobabilities: {'0': 0.75, '1': 0.25}\n",
            "readout": "احتمالات القياس في أساس Z لهذه الحالة مثال π/3, π/4."
          }
        ]
      },
      {
        "id": "bell",
        "name": "2. زوج بيل — Bell pair |Φ+⟩",
        "en": "Bell pair / entanglement",
        "file": "teleport/bell_pair.py",
        "command": "python -m teleport.bell_pair",
        "physics": "أليس Alice وبوب Bob يتشاركان تشابكًا Entanglement قبل النقل. الحالة هنا ثابتة: |Φ+⟩ (Bell state). لا توجد زوايا تختارها.",
        "formula": "|Φ+⟩ = (|00⟩ + |11⟩)/√2",
        "params": [
          {
            "name": "لا يوجد اختيار",
            "meaning": "دائمًا H ثم CNOT. الناتج |Φ+⟩ فقط في هذا القالب.",
            "allowed": [
              "هذه الحالة الواحدة"
            ],
            "note": "بدون معطيات"
          }
        ],
        "snippet": "from teleport.bell_pair import bell_pair, bell_counts\n\ncircuit, state = bell_pair()\nprint(state.probabilities_dict())\nprint(bell_counts(shots=1000))",
        "expect": "50% تقريبًا على 00 و 50% على 11. لا 01 ولا 10.",
        "full_code": "\"\"\"T2 — Bell pair |Φ+> = (|00> + |11>)/sqrt(2).\n\nAlice and Bob share entanglement before teleportation:\n\n    |00> --H(q0)--> (|00>+|10>)/sqrt(2) --CNOT--> (|00>+|11>)/sqrt(2)\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom qiskit import QuantumCircuit, transpile\nfrom qiskit.quantum_info import Statevector\nfrom qiskit_aer import AerSimulator\n\n\ndef bell_pair() -> tuple[QuantumCircuit, Statevector]:\n    qc = QuantumCircuit(2, name=\"bell\")\n    qc.h(0)\n    qc.cx(0, 1)\n    return qc, Statevector.from_instruction(qc)\n\n\ndef bell_counts(shots: int = 1000) -> dict[str, int]:\n    qc = QuantumCircuit(2, 2)\n    qc.h(0)\n    qc.cx(0, 1)\n    qc.measure([0, 1], [0, 1])\n    simulator = AerSimulator()\n    compiled = transpile(qc, simulator)\n    return simulator.run(compiled, shots=shots).result().get_counts()\n\n\ndef main() -> None:\n    qc, state = bell_pair()\n    print(qc)\n    print(state)\n    print(\"Probabilities:\", dict(state.probabilities_dict()))\n    print(\"Shot counts:\", bell_counts())\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "الحالة",
            "|Φ+⟩"
          ],
          [
            "shots",
            "1000"
          ]
        ],
        "example_code": "from teleport.bell_pair import bell_pair, bell_counts\n\ncircuit, state = bell_pair()\nprint(circuit)\nprint(dict(state.probabilities_dict()))\nprint(bell_counts(shots=1000))",
        "readout": "ارتباط تام: 00 أو 11 فقط. هذا التشابك الذي يستهلكه النقل الآني.",
        "run_output": "given: fixed Bell pair |Φ+> , shots = 1000\n     ┌───┐     \nq_0: ┤ H ├──■──\n     └───┘┌─┴─┐\nq_1: ─────┤ X ├\n          └───┘\nideal probabilities: {'00': 0.5, '11': 0.5}\nsimulator counts: {'00': 479, '11': 521}\nmeaning: only 00 and 11 — perfect correlation\n"
      },
      {
        "id": "protocol",
        "name": "3. بروتوكول أليس وبوب — Teleportation protocol",
        "en": "Alice measurement + Bob correction",
        "file": "teleport/protocol.py",
        "command": "python -m teleport.protocol",
        "physics": "أليس تقيس كيوبتين (Bell-basis measurement) وترسل لبوب بتين كلاسيكيين Classical bits. بوب يصحح Correction بـ X و/أو Z. أربع نتائج قياس → أربع تصحيحات.",
        "formula": "إذا m1=1 طبّق X على بوب. إذا m0=1 طبّق Z على بوب.",
        "params": [
          {
            "name": "theta, phi",
            "meaning": "نفس زوايا الحالة |ψ⟩ عند أليس.",
            "allowed": [
              "θ ∈ [0, π]",
              "φ ∈ [0, 2π)"
            ],
            "note": "زوايا مستمرة"
          },
          {
            "name": "(m0, m1)",
            "meaning": "نتيجة قياس أليس Alice measurement. كل بت 0 أو 1.",
            "allowed": [
              "(0,0)",
              "(0,1)",
              "(1,0)",
              "(1,1)"
            ],
            "note": "4 احتمالات فقط",
            "table": [
              [
                "m0",
                "m1",
                "Bob correction — تصحيح بوب"
              ],
              [
                "0",
                "0",
                "I — لا شيء"
              ],
              [
                "0",
                "1",
                "X only — X فقط"
              ],
              [
                "1",
                "0",
                "Z only — Z فقط"
              ],
              [
                "1",
                "1",
                "X then Z — X ثم Z"
              ]
            ]
          }
        ],
        "snippet": "from math import pi\nfrom teleport.protocol import build_dynamic_teleport\n\n# θ ∈ [0, π]    φ ∈ [0, 2π)\nqc = build_dynamic_teleport(theta=pi/3, phi=pi/4)\nprint(qc)",
        "expect": "دائرة بثلاث كيوبتات وقياسين وتصحيح شرطي. البتان (m0,m1) يأخذهما المحاكي تلقائيًا من أربع قيم.",
        "full_code": "\"\"\"T3 — Full teleportation protocol circuit.\n\nQubits:\n    q0 Alice  unknown |ψ>\n    q1 Alice  her half of the Bell pair\n    q2 Bob    his half of the Bell pair\n\nClassical bits:\n    c0 Alice q0 measurement  -> Bob applies Z if 1\n    c1 Alice q1 measurement  -> Bob applies X if 1\n    c2 Bob verification (used by later modules)\n\nStages:\n    prepare |ψ> → Bell pair → Alice CNOT → Alice H → measure → Bob X/Z\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom math import pi\n\nfrom qiskit import QuantumCircuit\n\n\ndef prepare_unknown(qc: QuantumCircuit, theta: float, phi: float) -> None:\n    qc.ry(theta, 0)\n    qc.rz(phi, 0)\n    qc.barrier(label=\"Prepare |psi>\")\n\n\ndef create_bell_pair(qc: QuantumCircuit) -> None:\n    qc.h(1)\n    qc.cx(1, 2)\n    qc.barrier(label=\"Bell pair\")\n\n\ndef alice_bell_basis(qc: QuantumCircuit) -> None:\n    qc.cx(0, 1)\n    qc.h(0)\n    qc.barrier(label=\"Alice\")\n\n\ndef alice_measure(qc: QuantumCircuit) -> None:\n    qc.measure(0, 0)\n    qc.measure(1, 1)\n    qc.barrier(label=\"Measurements\")\n\n\ndef bob_corrections(qc: QuantumCircuit) -> None:\n    with qc.if_test((qc.clbits[1], True)):\n        qc.x(2)\n    with qc.if_test((qc.clbits[0], True)):\n        qc.z(2)\n    qc.barrier(label=\"Bob corrected\")\n\n\ndef build_teleport_stages(theta: float, phi: float) -> QuantumCircuit:\n    \"\"\"Return the circuit after state prep, Bell pair, Alice CNOT, Alice H.\"\"\"\n    qc = QuantumCircuit(3)\n    qc.ry(theta, 0)\n    qc.rz(phi, 0)\n    qc.barrier(label=\"State prepared\")\n    qc.h(1)\n    qc.cx(1, 2)\n    qc.barrier(label=\"Bell pair\")\n    qc.cx(0, 1)\n    qc.barrier(label=\"Alice CNOT\")\n    qc.h(0)\n    qc.barrier(label=\"Alice H\")\n    return qc\n\n\ndef build_dynamic_teleport(theta: float, phi: float, n_clbits: int = 3) -> QuantumCircuit:\n    \"\"\"Measurement-based teleportation with Bob's classically controlled X/Z.\"\"\"\n    qc = QuantumCircuit(3, n_clbits)\n    prepare_unknown(qc, theta, phi)\n    create_bell_pair(qc)\n    alice_bell_basis(qc)\n    alice_measure(qc)\n    bob_corrections(qc)\n    return qc\n\n\ndef main() -> None:\n    theta = pi / 3\n    phi = pi / 4\n    print(\"Staged circuit (no measurement):\")\n    print(build_teleport_stages(theta, phi))\n    print(\"\\nDynamic circuit:\")\n    print(build_dynamic_teleport(theta, phi))\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "theta",
            "π/3"
          ],
          [
            "phi",
            "π/4"
          ],
          [
            "(m0,m1)",
            "واحد من 4 نتائج"
          ]
        ],
        "example_code": "from math import pi\nfrom teleport.protocol import build_dynamic_teleport\n\ntheta = pi/3\nphi = pi/4\nqc = build_dynamic_teleport(theta, phi)\nprint(qc)",
        "readout": "المحاكي يختار (m0,m1) من أربع قيم. بوب يصحح: X إذا m1=1 و Z إذا m0=1.",
        "run_output": "given: theta = pi/3 , phi = pi/4\nAlice measurement (m0,m1) will be one of: (0,0) (0,1) (1,0) (1,1)\n     ┌─────────┐┌─────────┐ Prepare |psi>            Bell pair      ┌───┐»\nq_0: ┤ Ry(π/3) ├┤ Rz(π/4) ├───────░──────────────────────░───────■──┤ H ├»\n     └─────────┘└─────────┘       ░       ┌───┐          ░     ┌─┴─┐└───┘»\nq_1: ─────────────────────────────░───────┤ H ├──■───────░─────┤ X ├─────»\n                                  ░       └───┘┌─┴─┐     ░     └───┘     »\nq_2: ─────────────────────────────░────────────┤ X ├─────░───────────────»\n                                  ░            └───┘     ░               »\nc: 3/════════════════════════════════════════════════════════════════════»\n                                                                         »\n«      Alice ┌─┐    Measurements                                           »\n«q_0: ───░───┤M├─────────░─────────────────────────────────────────────────»\n«        ░   └╥┘┌─┐      ░                                                 »\n«q_1: ───░────╫─┤M├──────░─────────────────────────────────────────────────»\n«        ░    ║ └╥┘      ░         ┌──────  ┌───┐ ───────┐   ┌──────  ┌───┐»\n«q_2: ───░────╫──╫───────░─────────┤ If-0  ─┤ X ├  End-0 ├───┤ If-0  ─┤ Z ├»\n«        ░    ║  ║       ░         └──╥───  └───┘ ───────┘   └──╥───  └───┘»\n«             ║  ║               ┌────╨────┐               ┌────╨────┐     »\n«c: 3/════════╩══╩═══════════════╡ c_1=0x1 ╞═══════════════╡ c_0=0x1 ╞═════»\n«             0  1               └─────────┘               └─────────┘     »\n«                Bob corrected \n«q_0: ─────────────────░───────\n«                      ░       \n«q_1: ─────────────────░───────\n«      ───────┐        ░       \n«q_2:   End-0 ├────────░───────\n«      ───────┘        ░       \n«c: 3/═════════════════════════\n«                              \nmeaning: Bob applies X if m1=1 and Z if m0=1\n",
        "case_groups": [
          {
            "name": "bits",
            "title": "قياس أليس — Alice bits (4 only)"
          }
        ],
        "cases": [
          {
            "id": "00",
            "label": "m0=0, m1=0",
            "given": [
              [
                "m0",
                "0"
              ],
              [
                "m1",
                "0"
              ]
            ],
            "example_code": "# نتيجة قياس أليس: m0=0, m1=0\n# بوب يطبّق: لا شيء (I)",
            "run_output": "given: Alice measured m0=0, m1=0\nBob correction = لا شيء (I)\n",
            "readout": "بوب يطبّق لا شيء (I) ليعيد |ψ⟩."
          },
          {
            "id": "01",
            "label": "m0=0, m1=1",
            "given": [
              [
                "m0",
                "0"
              ],
              [
                "m1",
                "1"
              ]
            ],
            "example_code": "# نتيجة قياس أليس: m0=0, m1=1\n# بوب يطبّق: X",
            "run_output": "given: Alice measured m0=0, m1=1\nBob correction = X\n",
            "readout": "بوب يطبّق X ليعيد |ψ⟩."
          },
          {
            "id": "10",
            "label": "m0=1, m1=0",
            "given": [
              [
                "m0",
                "1"
              ],
              [
                "m1",
                "0"
              ]
            ],
            "example_code": "# نتيجة قياس أليس: m0=1, m1=0\n# بوب يطبّق: Z",
            "run_output": "given: Alice measured m0=1, m1=0\nBob correction = Z\n",
            "readout": "بوب يطبّق Z ليعيد |ψ⟩."
          },
          {
            "id": "11",
            "label": "m0=1, m1=1",
            "given": [
              [
                "m0",
                "1"
              ],
              [
                "m1",
                "1"
              ]
            ],
            "example_code": "# نتيجة قياس أليس: m0=1, m1=1\n# بوب يطبّق: X ثم Z",
            "run_output": "given: Alice measured m0=1, m1=1\nBob correction = X ثم Z\n",
            "readout": "بوب يطبّق X ثم Z ليعيد |ψ⟩."
          }
        ]
      },
      {
        "id": "fidelity",
        "name": "4. هل الحالة وصلت؟ — Fidelity",
        "en": "State fidelity",
        "file": "teleport/verify_fidelity.py",
        "command": "python -m teleport.verify_fidelity",
        "physics": "نقارن حالة بوب النهائية بالحالة الأصلية (Fidelity). F=1 يعني تطابق كامل State match بما فيه الطور Phase.",
        "formula": "F(ψ_Alice , ρ_Bob) = 1  في المحاكي المثالي",
        "params": [
          {
            "name": "theta, phi",
            "meaning": "أي حالة نقية على كرة بلوخ.",
            "allowed": [
              "θ ∈ [0, π]",
              "φ ∈ [0, 2π)"
            ],
            "note": "يمكن تجربة أي زوج زوايا"
          }
        ],
        "snippet": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\n# جرب أي θ بين 0 و π  وأي φ بين 0 و 2π\nF, original, bob = teleport_and_verify(theta=pi/3, phi=pi/5)\nprint(\"Fidelity =\", F)",
        "expect": "Fidelity = 1.0 (ضمن خطأ عددي ضئيل جدًا).",
        "full_code": "\"\"\"T4 — Coherent verification by fidelity.\n\nMeasurement branches make a clean statevector proof awkward,\nso use the deferred-measurement principle:\n\n    classically controlled X  ->  CNOT from q1 to q2\n    classically controlled Z  ->  CZ   from q0 to q2\n\nThen trace out Alice's qubits and compare Bob's reduced state\nwith the original |ψ>. Ideal fidelity is 1.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom math import pi\n\nimport numpy as np\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector, partial_trace, state_fidelity\n\nfrom teleport.state_prep import prepare_psi\n\n\ndef coherent_teleport(theta: float, phi: float) -> QuantumCircuit:\n    qc = QuantumCircuit(3)\n    qc.ry(theta, 0)\n    qc.rz(phi, 0)\n    qc.barrier()\n    qc.h(1)\n    qc.cx(1, 2)\n    qc.barrier()\n    qc.cx(0, 1)\n    qc.h(0)\n    qc.barrier()\n    qc.cx(1, 2)\n    qc.cz(0, 2)\n    return qc\n\n\ndef teleport_and_verify(theta: float, phi: float) -> tuple[float, Statevector, object]:\n    _, original = prepare_psi(theta, phi)\n    final = Statevector.from_instruction(coherent_teleport(theta, phi))\n    bob = partial_trace(final, [0, 1])\n    return float(state_fidelity(original, bob)), original, bob\n\n\ndef random_fidelities(n: int = 10, seed: int = 42) -> list[float]:\n    rng = np.random.default_rng(seed)\n    values: list[float] = []\n    for _ in range(n):\n        theta = float(rng.uniform(0, pi))\n        phi = float(rng.uniform(0, 2 * pi))\n        fidelity, _, _ = teleport_and_verify(theta, phi)\n        values.append(fidelity)\n    return values\n\n\ndef main() -> None:\n    theta = pi / 3\n    phi = pi / 5\n    fidelity, original, bob = teleport_and_verify(theta, phi)\n    print(\"Fidelity:\", fidelity)\n    print(\"Original:\", original)\n    print(\"Bob:\", bob)\n    print(\"\\nRandom states:\")\n    for i, value in enumerate(random_fidelities(10), start=1):\n        print(f\"Test {i:2d}: fidelity={value:.12f}\")\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "theta",
            "π/3"
          ],
          [
            "phi",
            "π/5"
          ]
        ],
        "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\ntheta = pi/3\nphi = pi/5\nF, original, bob = teleport_and_verify(theta, phi)\nprint(\"Fidelity =\", F)\nprint(original)\nprint(bob)",
        "readout": "F=1 يعني حالة بوب تطابق أليس بما فيها الطور.",
        "run_output": "given: theta = pi/3 , phi = pi/5\noriginal: Statevector([0.8236391 -0.26761657j, 0.47552826+0.1545085j ],\n            dims=(2,))\nBob reduced state: DensityMatrix([[0.75      +0.j        , 0.35031463-0.25451848j],\n               [0.35031463+0.25451848j, 0.25      +0.j        ]],\n              dims=(2,))\nFidelity = 1.0\nmeaning: F=1 → Bob has Alice's state including phase\n",
        "case_groups": [
          {
            "name": "state",
            "title": "الحالة المنقولة — teleported state"
          }
        ],
        "cases": [
          {
            "id": "0",
            "label": "|0⟩",
            "given": [
              [
                "theta",
                "0"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(0, 0)\nprint(F)",
            "run_output": "given: teleport |0⟩\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          },
          {
            "id": "1",
            "label": "|1⟩",
            "given": [
              [
                "theta",
                "pi"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(pi, 0)\nprint(F)",
            "run_output": "given: teleport |1⟩\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          },
          {
            "id": "plus",
            "label": "|+⟩",
            "given": [
              [
                "theta",
                "pi/2"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(pi/2, 0)\nprint(F)",
            "run_output": "given: teleport |+⟩\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          },
          {
            "id": "minus",
            "label": "|−⟩",
            "given": [
              [
                "theta",
                "pi/2"
              ],
              [
                "phi",
                "pi"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(pi/2, pi)\nprint(F)",
            "run_output": "given: teleport |−⟩\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          },
          {
            "id": "ex",
            "label": "مثال π/3, π/4",
            "given": [
              [
                "theta",
                "pi/3"
              ],
              [
                "phi",
                "pi/4"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(pi/3, pi/4)\nprint(F)",
            "run_output": "given: teleport مثال π/3, π/4\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          }
        ]
      },
      {
        "id": "shots",
        "name": "5. تحقق بالقياس المتكرر — Shot-based verification",
        "en": "Shots / inverse-prep measurement",
        "file": "teleport/verify_shots.py",
        "command": "python -m teleport.verify_shots",
        "physics": "بعد النقل نعكس تحضير |ψ⟩ (Inverse of state preparation) على كيوبت بوب. إذا كانت الحالة صحيحة يعود إلى |0⟩ في كل تجربة Shot.",
        "formula": "نجاح التجربة ⟺ بت التحقق = 0",
        "params": [
          {
            "name": "theta, phi",
            "meaning": "زوايا |ψ⟩.",
            "allowed": [
              "θ ∈ [0, π]",
              "φ ∈ [0, 2π)"
            ],
            "note": "زوايا مستمرة"
          },
          {
            "name": "shots",
            "meaning": "كم مرة نكرر التجربة (shots على المحاكي Simulator).",
            "allowed": [
              "عدد صحيح موجب، مثل 500 أو 2000"
            ],
            "note": "كلّما زاد العدد أوضح الإحصاء"
          }
        ],
        "snippet": "from math import pi\nfrom teleport.verify_shots import run_dynamic, dynamic_success_rate\n\ncounts = run_dynamic(theta=pi/3, phi=pi/4, shots=500)\nok, total, rate = dynamic_success_rate(counts)\nprint(rate)",
        "expect": "rate = 1.0 على المحاكي المثالي. كل النتائج تبدأ بالبت 0.",
        "full_code": "\"\"\"T5 — Shot-based verification of the dynamic circuit.\n\n1. Teleport |ψ> to Bob with real measurements and if_test corrections.\n2. Apply the inverse of RY(θ) RZ(φ) on Bob: RZ(-φ) then RY(-θ).\n3. If Bob has |ψ>, he returns to |0>.\n4. Measure Bob. Success means the verification bit is 0.\n\nQiskit prints classical bits as c2 c1 c0, so successful\noutcomes start with 0: 000, 001, 010, 011.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom math import pi\n\nfrom qiskit import transpile\nfrom qiskit_aer import AerSimulator\n\nfrom teleport.protocol import build_dynamic_teleport\n\n\ndef inverse_prep_teleport(theta: float, phi: float):\n    qc = build_dynamic_teleport(theta, phi, n_clbits=3)\n    qc.rz(-phi, 2)\n    qc.ry(-theta, 2)\n    qc.measure(2, 2)\n    return qc\n\n\ndef run_dynamic(theta: float, phi: float, shots: int = 2000) -> dict[str, int]:\n    qc = inverse_prep_teleport(theta, phi)\n    simulator = AerSimulator()\n    compiled = transpile(qc, simulator)\n    return simulator.run(compiled, shots=shots).result().get_counts()\n\n\ndef _msb(bits: str) -> str:\n    return bits.replace(\" \", \"\")[0]\n\n\ndef dynamic_success_rate(counts: dict[str, int]) -> tuple[int, int, float]:\n    total = sum(counts.values())\n    successful = sum(count for bits, count in counts.items() if _msb(bits) == \"0\")\n    return successful, total, successful / total if total else 0.0\n\n\ndef main() -> None:\n    theta = pi / 3\n    phi = pi / 4\n    print(inverse_prep_teleport(theta, phi))\n    counts = run_dynamic(theta, phi)\n    successful, total, rate = dynamic_success_rate(counts)\n    print(\"Counts:\", counts)\n    print(\"Successful shots:\", successful)\n    print(\"Total shots:\", total)\n    print(\"Success rate:\", rate)\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "theta",
            "π/3"
          ],
          [
            "phi",
            "π/4"
          ],
          [
            "shots",
            "500"
          ]
        ],
        "example_code": "from math import pi\nfrom teleport.verify_shots import run_dynamic, dynamic_success_rate\n\ncounts = run_dynamic(theta=pi/3, phi=pi/4, shots=500)\nok, total, rate = dynamic_success_rate(counts)\nprint(counts)\nprint(ok, \"/\", total, \"→\", rate)",
        "readout": "كل التجارب ناجحة (البت الأيسر 0). الحالة وصلت ثم عادت إلى |0⟩ بعد العكس.",
        "run_output": "given: theta = pi/3 , phi = pi/4 , shots = 500\ncounts: {'010': 120, '000': 149, '001': 113, '011': 118}\nsuccessful = 500 / 500\nsuccess rate = 1.0\nmeaning: verification bit is always 0 on the ideal simulator\n",
        "case_groups": [
          {
            "name": "state",
            "title": "اختر الحالة — state"
          }
        ],
        "cases": [
          {
            "id": "0",
            "label": "|0⟩",
            "given": [
              [
                "theta",
                "0"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(0, 0)\nprint(F)",
            "run_output": "given: teleport |0⟩\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          },
          {
            "id": "1",
            "label": "|1⟩",
            "given": [
              [
                "theta",
                "pi"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(pi, 0)\nprint(F)",
            "run_output": "given: teleport |1⟩\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          },
          {
            "id": "plus",
            "label": "|+⟩",
            "given": [
              [
                "theta",
                "pi/2"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(pi/2, 0)\nprint(F)",
            "run_output": "given: teleport |+⟩\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          },
          {
            "id": "minus",
            "label": "|−⟩",
            "given": [
              [
                "theta",
                "pi/2"
              ],
              [
                "phi",
                "pi"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(pi/2, pi)\nprint(F)",
            "run_output": "given: teleport |−⟩\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          },
          {
            "id": "ex",
            "label": "مثال π/3, π/4",
            "given": [
              [
                "theta",
                "pi/3"
              ],
              [
                "phi",
                "pi/4"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.verify_fidelity import teleport_and_verify\n\nF, _, _ = teleport_and_verify(pi/3, pi/4)\nprint(F)",
            "run_output": "given: teleport مثال π/3, π/4\nFidelity = 1.0\n",
            "readout": "F=1: الحالة وصلت بما فيها الطور."
          }
        ]
      },
      {
        "id": "nocorr",
        "name": "6. بدون تصحيح بوب — No correction",
        "en": "No X/Z correction (classical bits required)",
        "file": "teleport/no_correction.py",
        "command": "python -m teleport.no_correction",
        "physics": "التشابك Entanglement وحده لا يكفي. بدون البتين الكلاسيكيين Classical bits حالة بوب مختلطة Mixed. لذلك النقل ليس أسرع من الضوء No-signaling.",
        "formula": "بدون X/Z  ⟹  F < 1",
        "params": [
          {
            "name": "theta, phi",
            "meaning": "نفس زوايا الحالة الأصلية للمقارنة.",
            "allowed": [
              "θ ∈ [0, π]",
              "φ ∈ [0, 2π)"
            ],
            "note": "مثال: π/3 و π/4"
          }
        ],
        "snippet": "from math import pi\nfrom teleport.no_correction import fidelity_without_corrections\n\nF, bob = fidelity_without_corrections(theta=pi/3, phi=pi/4)\nprint(\"Fidelity بدون تصحيح =\", F)",
        "expect": "Fidelity أقل من 1 بوضوح (غالبًا حول 0.5 لحالة عامة).",
        "full_code": "\"\"\"T6 — What if Bob skips the corrections?\n\nEntanglement alone does not give Bob |ψ>. Without X/Z\ncorrections his reduced state is mixed and fidelity drops.\nThe two classical bits are required; this is also why\nteleportation is not faster than light.\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom math import pi\n\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector, partial_trace, state_fidelity\n\nfrom teleport.state_prep import prepare_psi\n\n\ndef no_correction_circuit(theta: float, phi: float) -> QuantumCircuit:\n    qc = QuantumCircuit(3)\n    qc.ry(theta, 0)\n    qc.rz(phi, 0)\n    qc.h(1)\n    qc.cx(1, 2)\n    qc.cx(0, 1)\n    qc.h(0)\n    return qc\n\n\ndef fidelity_without_corrections(theta: float, phi: float) -> tuple[float, object]:\n    _, original = prepare_psi(theta, phi)\n    final = Statevector.from_instruction(no_correction_circuit(theta, phi))\n    bob = partial_trace(final, [0, 1])\n    return float(state_fidelity(original, bob)), bob\n\n\ndef main() -> None:\n    theta = pi / 3\n    phi = pi / 4\n    fidelity, bob = fidelity_without_corrections(theta, phi)\n    print(\"Bob without corrections:\")\n    print(bob)\n    print(\"Fidelity without corrections:\", fidelity)\n\n\nif __name__ == \"__main__\":\n    main()\n",
        "given": [
          [
            "theta",
            "π/3"
          ],
          [
            "phi",
            "π/4"
          ]
        ],
        "example_code": "from math import pi\nfrom teleport.no_correction import fidelity_without_corrections\nfrom teleport.verify_fidelity import teleport_and_verify\n\ntheta, phi = pi/3, pi/4\ngood, _, _ = teleport_and_verify(theta, phi)\nbad, bob = fidelity_without_corrections(theta, phi)\nprint(\"مع تصحيح:\", good)\nprint(\"بدون تصحيح:\", bad)\nprint(bob)",
        "readout": "بدون البتين الكلاسيكيين F ينخفض. التشابك وحده لا ينقل الحالة.",
        "run_output": "given: theta = pi/3 , phi = pi/4\nBob without corrections: DensityMatrix([[ 5.00000000e-01+0.00000000e+00j,\n                -5.65430751e-18-8.55550752e-18j],\n               [-5.65430751e-18+8.55550752e-18j,\n                 5.00000000e-01+0.00000000e+00j]],\n              dims=(2,))\nFidelity WITH corrections    = 1.0\nFidelity WITHOUT corrections = 0.5\nmeaning: classical bits are required; entanglement alone is not enough\n",
        "case_groups": [
          {
            "name": "state",
            "title": "بدون تصحيح — no correction"
          }
        ],
        "cases": [
          {
            "id": "0",
            "label": "|0⟩",
            "given": [
              [
                "theta",
                "0"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.no_correction import fidelity_without_corrections\n\nF, _ = fidelity_without_corrections(0, 0)\nprint(F)",
            "run_output": "given: |0⟩ بدون تصحيح Bob\nFidelity = 0.5\n",
            "readout": "بدون X/Z تنخفض F إلا لحالات خاصة."
          },
          {
            "id": "1",
            "label": "|1⟩",
            "given": [
              [
                "theta",
                "pi"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.no_correction import fidelity_without_corrections\n\nF, _ = fidelity_without_corrections(pi, 0)\nprint(F)",
            "run_output": "given: |1⟩ بدون تصحيح Bob\nFidelity = 0.5\n",
            "readout": "بدون X/Z تنخفض F إلا لحالات خاصة."
          },
          {
            "id": "plus",
            "label": "|+⟩",
            "given": [
              [
                "theta",
                "pi/2"
              ],
              [
                "phi",
                "0"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.no_correction import fidelity_without_corrections\n\nF, _ = fidelity_without_corrections(pi/2, 0)\nprint(F)",
            "run_output": "given: |+⟩ بدون تصحيح Bob\nFidelity = 0.5\n",
            "readout": "بدون X/Z تنخفض F إلا لحالات خاصة."
          },
          {
            "id": "minus",
            "label": "|−⟩",
            "given": [
              [
                "theta",
                "pi/2"
              ],
              [
                "phi",
                "pi"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.no_correction import fidelity_without_corrections\n\nF, _ = fidelity_without_corrections(pi/2, pi)\nprint(F)",
            "run_output": "given: |−⟩ بدون تصحيح Bob\nFidelity = 0.5\n",
            "readout": "بدون X/Z تنخفض F إلا لحالات خاصة."
          },
          {
            "id": "ex",
            "label": "مثال π/3, π/4",
            "given": [
              [
                "theta",
                "pi/3"
              ],
              [
                "phi",
                "pi/4"
              ]
            ],
            "example_code": "from math import pi\nfrom teleport.no_correction import fidelity_without_corrections\n\nF, _ = fidelity_without_corrections(pi/3, pi/4)\nprint(F)",
            "run_output": "given: مثال π/3, π/4 بدون تصحيح Bob\nFidelity = 0.5\n",
            "readout": "بدون X/Z تنخفض F إلا لحالات خاصة."
          }
        ]
      },
      {
        "id": "tele_master",
        "name": "7. الاختبار الشامل — Integration test",
        "en": "Master integration test",
        "file": "tests/test_all_modules.py",
        "command": "pytest tests/test_all_modules.py -v",
        "physics": "يجمع Query algorithms والنقل الآني Teleportation ويتأكد أن السلسلة Pipeline كاملة تعمل.",
        "formula": "كل القوالب ⟶ اختبار واحد",
        "params": [
          {
            "name": "لا توجد معطيات",
            "meaning": "تشغيل جاهز.",
            "allowed": [
              "الأمر كما هو"
            ],
            "note": "بدون اختيارات"
          }
        ],
        "snippet": "# من مجلد quantum_reference:\n# pytest tests/test_all_modules.py -v",
        "expect": "كل الاختبارات تنجح، وتُحفظ صور الدوائر في figures.",
        "full_code": "\"\"\"Master integration test.\n\nAssembles every isolated template into one end-to-end pipeline:\n\n    query oracles → superposition → kickback → interference\n    → parity / mark / AND\n    → teleportation (fidelity + shots + histogram)\n\nRun:\n    pytest tests/test_all_modules.py -v\n    python tests/test_all_modules.py\n\"\"\"\n\nfrom __future__ import annotations\n\nfrom math import pi\nfrom pathlib import Path\n\nimport matplotlib\n\nmatplotlib.use(\"Agg\")\n\nfrom matplotlib import pyplot as plt\nfrom qiskit.quantum_info import Statevector\nfrom qiskit.visualization import plot_histogram\n\nfrom common.env import require_qiskit\nfrom query.and_oracle import and_oracle, evaluate_two_input_boolean_oracle\nfrom query.basis_query import basis_query\nfrom query.complexity import count_oracle_blocks, oracle_is_self_inverse, query_block_circuit\nfrom query.marked_state import mark_demo\nfrom query.one_bit_oracles import make_oracle_1bit\nfrom query.parity_oracle import parity_interference, parity_oracle\nfrom query.phase_kickback import kickback_readout\nfrom query.phase_oracle import interference_circuit\nfrom query.superposition_query import superposition_counts, superposition_query\nfrom teleport.bell_pair import bell_pair\nfrom teleport.no_correction import fidelity_without_corrections\nfrom teleport.protocol import build_dynamic_teleport\nfrom teleport.verify_fidelity import teleport_and_verify\nfrom teleport.verify_shots import dynamic_success_rate, run_dynamic\nfrom tests.helpers import count_dict, prob_dict\n\nFIGURES = Path(__file__).resolve().parents[1] / \"figures\"\nFIGURES.mkdir(exist_ok=True)\n\n\ndef _save_circuit(circuit, name: str) -> None:\n    figure = circuit.draw(\"mpl\", fold=-1)\n    figure.savefig(FIGURES / name, bbox_inches=\"tight\")\n    plt.close(figure)\n\n\ndef test_all_modules_end_to_end_pipeline():\n    require_qiskit()\n\n    oracle = make_oracle_1bit(\"identity\")\n    assert oracle.count_ops() == {\"cx\": 1}\n\n    _, basis1 = basis_query(\"identity\", 1)\n    assert prob_dict(basis1)[\"11\"] == 1.0\n\n    super_qc = superposition_query(\"identity\")\n    super_probs = prob_dict(Statevector.from_instruction(super_qc))\n    assert set(super_probs) == {\"00\", \"11\"}\n\n    super_counts = count_dict(superposition_counts(\"identity\", shots=1000))\n    plot_histogram(super_counts).savefig(FIGURES / \"query_superposition_histogram.png\", bbox_inches=\"tight\")\n    plt.close()\n\n    readout = kickback_readout(\"identity\")\n    readout_probs = prob_dict(Statevector.from_instruction(readout))\n    assert all(label[-1] == \"1\" for label in readout_probs)\n    _save_circuit(readout, \"query_kickback_readout.png\")\n\n    z_probs = prob_dict(Statevector.from_instruction(interference_circuit()))\n    assert abs(z_probs.get(\"1\", 0.0) - 1.0) < 1e-10\n\n    parity = parity_oracle()\n    assert parity.count_ops() == {\"cx\": 2}\n    parity_probs = prob_dict(Statevector.from_instruction(parity_interference()))\n    assert all(label[-2:] == \"11\" for label in parity_probs)\n\n    _, marked = mark_demo(\"11\")\n    mark_probs = prob_dict(marked)\n    assert all(abs(p - 0.25) < 1e-10 for p in mark_probs.values())\n    assert marked.data[3].real < 0\n\n    and_table = evaluate_two_input_boolean_oracle(and_oracle())\n    assert and_table[(1, 1)][\"111\"] == 1.0\n\n    blocks = query_block_circuit(3)\n    assert count_oracle_blocks(blocks) == 3\n    assert oracle_is_self_inverse(\"identity\")\n\n    _, bell_state = bell_pair()\n    bell_probs = prob_dict(bell_state)\n    assert set(bell_probs) == {\"00\", \"11\"}\n\n    theta, phi = pi / 3, pi / 4\n    fidelity, _, _ = teleport_and_verify(theta, phi)\n    assert abs(fidelity - 1.0) < 1e-10\n\n    bad, _ = fidelity_without_corrections(theta, phi)\n    assert bad < 0.9\n\n    dynamic = build_dynamic_teleport(theta, phi)\n    _save_circuit(dynamic, \"teleport_dynamic_circuit.png\")\n\n    counts = count_dict(run_dynamic(theta, phi, shots=500))\n    successful, total, rate = dynamic_success_rate(counts)\n    assert total == 500\n    assert successful == 500\n    assert rate == 1.0\n    plot_histogram(counts).savefig(FIGURES / \"teleport_shot_histogram.png\", bbox_inches=\"tight\")\n    plt.close()\n\n    print(\"Pipeline OK\")\n    print(\"  kickback input bit is 1\")\n    print(\"  parity interference -> |11>\")\n    print(\"  teleport fidelity =\", fidelity)\n    print(\"  teleport shot success =\", rate)\n    print(\"  figures ->\", FIGURES)\n\n\nif __name__ == \"__main__\":\n    test_all_modules_end_to_end_pipeline()\n",
        "given": [
          [
            "الأمر",
            "pytest tests/test_all_modules.py -v"
          ]
        ],
        "example_code": "# شغّل من مجلد quantum_reference\n# pytest tests/test_all_modules.py -v",
        "readout": "نفس الاختبار الشامل للمسارين. النجاح يعني الشكل الكامل سليم.",
        "run_output": "given: no parameters — full pipeline\nsimulator: pytest tests/test_all_modules.py -v\nresult: 43 passed\nmeaning: every module connected without breaking changes\n"
      }
    ]
  },
  "glossary": [
    [
      "Qubit",
      "كيوبت",
      "وحدة المعلومات الكمية (بدل البت الكلاسيكي)."
    ],
    [
      "State |ψ⟩",
      "حالة",
      "وصف الكيوبت: سعات + طور."
    ],
    [
      "State preparation",
      "تحضير الحالة",
      "بناء |ψ⟩ ببوابات مثل RY و RZ. هذا ملف state_prep.py."
    ],
    [
      "Superposition",
      "تراكب",
      "الحالة تكون مزيجًا من |0⟩ و |1⟩ في الوقت نفسه."
    ],
    [
      "Amplitude",
      "سعة",
      "العدد المركب أمام كل أساس. مربع مقدارها = الاحتمال."
    ],
    [
      "Phase",
      "طور",
      "الزاوية في السعة المركبة. لا تظهر في قياس Z مباشرة."
    ],
    [
      "Oracle / black box",
      "أوراكل / صندوق أسود",
      "بوابة U_f تمثل الدالة المخفية f."
    ],
    [
      "Query",
      "استعلام",
      "استدعاء واحد للـ Oracle."
    ],
    [
      "Basis state",
      "حالة أساس",
      "واحدة من |00⟩, |01⟩, |10⟩, |11⟩ ..."
    ],
    [
      "Measurement",
      "قياس",
      "يحوّل الحالة الكمية إلى نتيجة كلاسيكية ويهدم التراكب."
    ],
    [
      "Hadamard (H)",
      "هادامارد",
      "بوابة تصنع |+⟩ من |0⟩، وتكشف الطور إذا أُعيدت."
    ],
    [
      "Phase kickback",
      "ارتداد الطور",
      "f(x) تُكتب كإشارة (−1)^{f(x)} على المدخل."
    ],
    [
      "Interference",
      "تداخل",
      "جمع السعات بحيث بعض المسارات تلغي وبعضها يقوى."
    ],
    [
      "Bell pair / Entanglement",
      "زوج بيل / تشابك",
      "ارتباط كمي بين كيوبتي أليس وبوب."
    ],
    [
      "Teleportation",
      "نقل آني",
      "نقل الحالة |ψ⟩ لا الجسيم نفسه."
    ],
    [
      "Alice / Bob",
      "أليس / بوب",
      "الطرف المرسل والمستقبل في البروتوكول."
    ],
    [
      "Classical bits",
      "بتان كلاسيكيان",
      "نتيجة قياس أليس؛ لازمة لتصحيح بوب."
    ],
    [
      "Correction (X, Z)",
      "تصحيح",
      "X يقلب البت، Z يقلب الطور."
    ],
    [
      "Fidelity",
      "وفاء/تطابق الحالة",
      "F=1 يعني حالة بوب = حالة أليس."
    ],
    [
      "Shots",
      "تكرارات المحاكاة",
      "كم مرة نكرر التجربة على المحاكي."
    ],
    [
      "Circuit",
      "دائرة",
      "تسلسل البوابات على الكيوبتات."
    ],
    [
      "Simulator (Aer)",
      "محاكٍ",
      "برنامج يشغّل الدائرة دون جهاز كمي حقيقي."
    ],
    [
      "Bloch sphere",
      "كرة بلوخ",
      "تمثيل هندسي لحالة كيوبت واحد بزاويتين θ و φ."
    ],
    [
      "CNOT",
      "سي-نوت",
      "بوابة مضبوطة: تقلب الهدف إذا كان المتحكم |1⟩."
    ],
    [
      "Toffoli (CCX)",
      "توفولي",
      "CNOT بمُتحكّمَين؛ تمثّل AND على الهدف."
    ],
    [
      "Deutsch algorithm",
      "خوارزمية دويتش",
      "تمييز الدالة الثابتة عن المتوازنة باستعلام واحد."
    ],
    [
      "Grover",
      "جروفر",
      "بحث كمي يعتمد على تعليم الحالة Marking ثم التداخل."
    ],
    [
      "Reversible gate",
      "بوابة عكسية",
      "يمكن عكسها؛ شرط تمثيل الدوال داخل Oracle."
    ],
    [
      "No-signaling",
      "لا إشارة أسرع من الضوء",
      "التشابك لا ينقل معلومات دون بتات كلاسيكية."
    ]
  ]
};
