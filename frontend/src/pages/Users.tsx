import { useMemo, useState } from "react";
import KpiCard from "../components/KpiCard";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../utils/theme";
import { STORAGE_KEYS } from "../utils/erpStore";
import { usePersistentState } from "../utils/usePersistentState";
import type { Employee } from "../types/erp";

const Users = () => {
  const { theme } = useTheme();
  const t = THEMES[theme];

  const [employees, setEmployees] = usePersistentState<Employee[]>(
    STORAGE_KEYS.employees,
    [],
  );
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const filteredEmployees = useMemo(() => {
    const query = search.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query),
    );
  }, [employees, search]);

  const stats = useMemo(() => {
    const active = employees.filter((employee) => employee.status === "Active").length;
    const inactive = employees.length - active;
    const departments = new Set(employees.map((employee) => employee.department)).size;
    return { active, inactive, departments };
  }, [employees]);

  const onCreateEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !role.trim() || !department.trim() || !email.trim()) {
      return;
    }

    const employee: Employee = {
      id: `EMP-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      department: department.trim(),
      email: email.trim(),
      status: "Active",
    };

    setEmployees((prev) => [employee, ...prev]);
    setName("");
    setRole("");
    setDepartment("");
    setEmail("");
  };

  const toggleEmployeeStatus = (id: string) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              status: employee.status === "Active" ? "Inactive" : "Active",
            }
          : employee,
      ),
    );
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className={`mb-3 inline-flex items-center gap-2 rounded-full border ${t.badgeBorder} ${t.badgeBg} px-3 py-1 text-xs font-semibold ${t.badgeText}`}>
            <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${t.badgeDot}`} />
            Workforce Hub
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Employee Management
          </h2>
          <p className="mt-1 text-slate-400">
            Add users, track roles, and activate/deactivate access.
          </p>
        </div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, role, department"
          className={`w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 backdrop-blur md:w-80 ${t.accentBorder} focus:outline-none`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Employees" value={String(employees.length)} hint="People in directory" theme={t} />
        <KpiCard title="Active" value={String(stats.active)} hint="Currently enabled" theme={t} />
        <KpiCard title="Inactive" value={String(stats.inactive)} hint="Needs review" theme={t} />
        <KpiCard title="Departments" value={String(stats.departments)} hint="Distinct teams" theme={t} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className={`rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition-all duration-300 ${t.accentBorder} ${t.accentGlow}`}>

  <div className="border-b border-white/10 px-5 py-4">
    <h3 className={`text-lg font-semibold ${t.accentText}`}>Team Directory</h3>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full text-left text-sm">
      
      <thead className="text-slate-400">
        <tr>
          <th className="px-4 py-3 font-medium">Name</th>
          <th className="px-4 py-3 font-medium">Role</th>
          <th className="px-4 py-3 font-medium">Department</th>
          <th className="px-4 py-3 font-medium">Email</th>
          <th className="px-4 py-3 font-medium">Status</th>
          <th className="px-4 py-3 font-medium">Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredEmployees.map((employee) => (
          <tr
            key={employee.id}
            className="group/row border-t border-white/5 transition-all duration-200 hover:bg-white/10 hover:-translate-y-[2px]"
          >
            <td className="px-4 py-3 font-medium text-white">
              {employee.name}
            </td>

            <td className="px-4 py-3 text-slate-400">
              {employee.role}
            </td>

            <td className="px-4 py-3 text-slate-400">
              {employee.department}
            </td>

            <td className="px-4 py-3 text-slate-400">
              {employee.email}
            </td>

            <td className="px-4 py-3">
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  employee.status === "Active"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-slate-500/20 text-slate-400"
                }`}
              >
                {employee.status}
              </span>
            </td>

            <td className="px-4 py-3">
              <button
                type="button"
                onClick={() => toggleEmployeeStatus(employee.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${t.activeBg} ${t.activeText} hover:bg-white/15`}
              >
                Toggle
              </button>
            </td>
          </tr>
        ))}
        {filteredEmployees.length === 0 && (
          <tr>
            <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
              No employees found.
            </td>
          </tr>
        )}
      </tbody>

    </table>
  </div>
</div>
        <form
          onSubmit={onCreateEmployee}
          className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl ${t.accentBorder}`}
        >
          <h3 className={`text-lg font-semibold ${t.accentText}`}>Add Employee</h3>
          <div className="mt-4 space-y-3">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              required
            />
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Role"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              required
            />
            <input
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              placeholder="Department"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className={`mt-4 w-full rounded-lg bg-gradient-to-r px-4 py-2 font-semibold text-white ${t.accentGradient}`}
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Users;
