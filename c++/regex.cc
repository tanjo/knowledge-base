#include <iostream>
#include <regex>

int main() {
  std::string str;
  while(std::cin >> str) {
    std::smatch smatch;
    if (std::regex_search(str, smatch, std::regex("\\d\\d\\d"))) {
      std::cout << std::stoi(str) * 2 << std::endl;
    } else {
      std::cout << "error" << std::endl;
    }
  }
  return 0;
}